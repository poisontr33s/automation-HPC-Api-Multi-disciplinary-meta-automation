# Automation HPC API Multi-disciplinary Meta-automation

A Python repository for managing APIs, cross-pollination of AI models, extensions, and meta-automation. Built with FastAPI, this modular system provides a structured starting point for API management, AI model integration, and automation tasks.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
Follow these exact commands to set up the development environment:

1. **Verify Python environment:**
   ```bash
   python3 --version  # Should be Python 3.8+, tested with 3.12.3
   pip --version
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt  # Takes ~10 seconds. NEVER CANCEL. Set timeout to 120+ seconds minimum for safety.
   ```
   This installs: FastAPI, Uvicorn, Pydantic, Requests, NumPy

3. **Verify installation:**
   ```bash
   python3 -c "import fastapi; print('FastAPI version:', fastapi.__version__)"
   python3 -c "import json; print('Config loads:', bool(json.load(open('config/config.json'))))"
   ```

### Running Applications

**ALWAYS run the bootstrapping steps first before starting any application.**

1. **Create and run a FastAPI application:**
   ```bash
   # Example: Create a simple test API
   python3 -c "
   from fastapi import FastAPI
   import uvicorn
   app = FastAPI()
   @app.get('/')
   def root(): return {'message': 'Hello World'}
   if __name__ == '__main__': uvicorn.run(app, host='0.0.0.0', port=8000)
   "
   # Example: Create a simple test API
   # 1. Create a file named `test_api.py` with the following content:
   ```python
   from fastapi import FastAPI
   import uvicorn
   app = FastAPI()
   @app.get('/')
   def root():
       return {'message': 'Hello World'}
   if __name__ == '__main__':
       uvicorn.run(app, host='0.0.0.0', port=8000)
   # 1. Create a file named `test_api.py` with the following content:
2. **Test running applications:**
   ```bash
   curl http://localhost:8000/  # Test API endpoint
   ```

3. **Configuration management:**
   ```bash
   # Always load config from config/config.json
   python3 -c "import json; config = json.load(open('config/config.json')); print(config)"
   ```

## Validation

### Always Complete These Validation Steps After Making Changes:

1. **Dependency validation:**
   ```bash
   pip install -r requirements.txt  # Verify no dependency conflicts
   ```

2. **Configuration validation:**
   ```bash
   python3 -c "import json; json.load(open('config/config.json'))"  # Verify config is valid JSON
   ```

3. **Application structure validation:**
   ```bash
   python3 -c "
   import sys
   from pathlib import Path
   sys.path.insert(0, 'src')
   config_path = Path('config/config.json')
   src_path = Path('src')
   print(f'Config exists: {config_path.exists()}')
   print(f'Src directory exists: {src_path.exists()}')
   print(f'API directory: {(src_path / \"api\").exists()}')
   "
   ```

4. **FastAPI application test:**
   Always create and test a minimal FastAPI app to ensure the environment works:
   ```bash
   # Simple creation test (always works):
   python3 -c "from fastapi import FastAPI; app = FastAPI(); print('FastAPI app creation: SUCCESS')"
   
   # Full server test (if you need to validate server functionality):
   # Create temp file and run server test
   cat > test_api.py << 'EOF'
   from fastapi import FastAPI
   import uvicorn
   app = FastAPI()
   @app.get('/test')
   def test(): return {'status': 'working'}
   if __name__ == "__main__": uvicorn.run(app, host="0.0.0.0", port=8000)
   EOF
   
   # Then test with: python3 test_api.py (background) and curl http://localhost:8000/test
   ```

### Manual Validation Requirements:
- **ALWAYS test configuration loading** after modifying config/config.json
- **ALWAYS verify API endpoints respond** when creating FastAPI applications
- **ALWAYS test import paths** when adding new modules to src/
- You can build and run FastAPI applications for testing, and they will be accessible via HTTP

### Complete End-to-End Test Scenario:
After making any changes, run this complete validation sequence:
```bash
# 1. Clean dependency test
pip install -r requirements.txt --force-reinstall  # ~10 seconds

# 2. Full application test
cat > /tmp/test_complete.py << 'EOF'
from fastapi import FastAPI
import uvicorn, json
from pathlib import Path
app = FastAPI()
@app.get("/")
def root(): return {"status": "working"}
@app.get("/validate")
def validate():
    config = json.load(open("config/config.json"))
    return {"config": bool(config), "structure": Path("src/api").exists()}
if __name__ == "__main__": uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# 3. Run and test (background process)
python3 /tmp/test_complete.py &
sleep 3  # Wait for server start
curl http://localhost:8000/ && curl http://localhost:8000/validate
python3 /tmp/test_complete.py & SERVER_PID=$!
sleep 3  # Wait for server start
curl http://localhost:8000/ && curl http://localhost:8000/validate
kill $SERVER_PID  # Stop server

# Expected output: {"status":"working"} and {"config":true,"structure":true}
```

## Common Tasks

### Adding New API Integration:
1. Create new file in `src/api/`
2. Add any API keys to `config/config.json` (use placeholders, not real keys)
3. Update `requirements.txt` if new dependencies are needed
4. Test with validation steps above

### Adding New AI Model:
1. Place model code in `src/models/`
2. Add dependencies to `requirements.txt`
3. Test import paths and model loading
4. Validate configuration loading if model requires config

### Repository Structure Navigation:
```
src/                 # Main source code
├── api/            # API integrations and implementations  
├── models/         # AI model related code
└── extensions/     # Extensions to core functionality

config/             # Configuration files
└── config.json     # Main configuration (use env vars for secrets)

requirements.txt    # Python dependencies
AGENTS.md          # AI agent instructions
README.md          # Project documentation
```

## Critical Information

### Timing and Timeouts:
- **Dependency installation**: ~10 seconds (normal), ~10 seconds (force reinstall). NEVER CANCEL. Set timeout to 120+ seconds minimum.
- **FastAPI startup**: ~2 seconds. NEVER CANCEL before checking endpoints.
- **Configuration loading**: <1 second.
- **Application validation**: <5 seconds total for all validation steps.

### Known Working Commands:
```bash
# Environment setup (all tested and working):
python3 --version
pip --version
pip install -r requirements.txt

# Configuration (tested and working):
python3 -c "import json; print(json.load(open('config/config.json')))"

# FastAPI application creation (tested and working):
python3 -c "from fastapi import FastAPI; import uvicorn; app = FastAPI(); uvicorn.run(app, host='0.0.0.0', port=8000)"

# Testing endpoints (tested and working):
curl http://localhost:8000/
```

### Known Limitations:
- **No testing framework set up yet** - Create tests manually using Python's unittest or add pytest to requirements.txt
- **No linting tools configured** - Add flake8/black to requirements.txt if code style enforcement is needed
- **No CI/CD pipeline** - GitHub Actions workflows would need to be created in .github/workflows/
- **No build scripts** - This is a pure Python project, no compilation needed

### Development Best Practices:
- Always use `config/config.json` for configuration, never hardcode values
- Use environment variables for sensitive data (API keys, passwords)
- Add new dependencies to `requirements.txt`
- Place API code in `src/api/`, model code in `src/models/`, extensions in `src/extensions/`
- Test your changes with the validation steps above before committing

## Quick Reference Commands

### Most Common Operations:
```bash
# Fresh setup:
pip install -r requirements.txt

# Create simple API:
python3 -c "from fastapi import FastAPI; app = FastAPI(); print('FastAPI app created')"

# Test config:
python3 -c "import json; print(json.load(open('config/config.json'))['model_settings'])"

# Check structure:
ls -la src/ config/
```

### Emergency Fixes:
```bash
# If dependencies break:
pip install -r requirements.txt --force-reinstall

# If config is corrupted:
python3 -c "import json; json.load(open('config/config.json'))"  # Should show error

# If imports fail:
python3 -c "import sys; sys.path.insert(0, 'src'); print('Path set for src imports')"
```

**Remember: This is a development-stage repository. Focus on functionality over polish, and always validate your changes work with the commands above.**

---

## Multi-Agent Cross-Pollination & Collaboration

### Onboarding Jules Coding Agent (@jules)

**Jules Agent Integration Guide:**

Jules coding agents are multi-agent automation platforms that can be integrated into this Python repository for enhanced coding capabilities.

#### Jules Agent Types & Capabilities:
1. **Open Jules** (JavaScript/TypeScript-based):
   - Multi-agent architecture (Planner, Developer, Reviewer, Branch Namer, PR Writer)
   - Uses Ollama for local AI models
   - React frontend + Node.js backend
   - Full GitHub workflow automation

2. **Jules Agent API** (Python-based):
   - FastAPI microservice architecture (compatible with this repo)
   - GitHub integration for cloning and PR creation
   - Autonomous task execution

#### Onboarding Steps for @jules:

1. **Environment Setup for Jules Integration:**
   ```bash
   # Verify Python environment compatibility
   python3 --version  # Must be 3.8+ (Jules API compatible)
   
   # Install additional Jules-compatible dependencies
   pip install fastapi uvicorn requests github3.py GitPython
   
   # Verify FastAPI compatibility
   python3 -c "from fastapi import FastAPI; print('Jules-FastAPI compatibility: OK')"
   ```

2. **Jules Agent Configuration Integration:**
   ```bash
   # Add Jules agent config to existing config
   python3 -c "
   import json
   config = json.load(open('config/config.json'))
   config['jules_agent'] = {
       'enabled': True,
       'api_endpoint': 'localhost:8000',
       'github_integration': True,
       'multi_agent_mode': True
   }
   json.dump(config, open('config/config.json', 'w'), indent=2)
   print('Jules agent configuration added')
   "
   ```

3. **Jules Agent API Integration Pattern:**
   ```python
   # Example integration in src/api/jules_integration.py
   from fastapi import FastAPI, BackgroundTasks
   from typing import Dict, Any
   
   # Jules-compatible task endpoint
   @app.post("/jules-task")
   async def process_jules_task(
       prompt: str,
       github_repo_url: str,
       github_branch: str = "main",
       background_tasks: BackgroundTasks = None
   ):
       # Integration logic for Jules agents
       return {"task_id": "generated-id", "status": "accepted"}
   ```

4. **Validation for Jules Integration:**
   ```bash
   # Test Jules agent compatibility
   python3 -c "
   import requests
   import json
   from pathlib import Path
   
   # Verify Jules-compatible endpoints exist
   config = json.load(open('config/config.json'))
   print(f'Jules config loaded: {bool(config.get(\"jules_agent\"))}')
   print('Jules agent onboarding: COMPLETE')
   "
   ```

### Onboarding Gemini Coding Agent (@gemini-coding-agent)

**Gemini Agent Integration Guide:**

Gemini coding agents leverage Google's Gemini API for intelligent code analysis, PR reviews, and development assistance.

#### Gemini Agent Types & Capabilities:
1. **PR Review Agents**: Automated code review using Gemini LLM
2. **Code Analysis Agents**: Repository analysis and insights
3. **Development Agents**: Code generation and refactoring assistance

#### Onboarding Steps for @gemini-coding-agent:

1. **Environment Setup for Gemini Integration:**
   ```bash
   # Install Gemini-compatible dependencies
   pip install google-generativeai python-dotenv aiohttp
   
   # Verify Gemini API compatibility
   python3 -c "
   try:
       import google.generativeai as genai
       print('Gemini API library: INSTALLED')
   except ImportError:
       print('Installing google-generativeai...')
       import subprocess
       subprocess.run(['pip', 'install', 'google-generativeai'])
   "
   ```

2. **Gemini Agent Configuration Integration:**
   ```bash
   # Add Gemini agent config to existing config
   python3 -c "
   import json
   config = json.load(open('config/config.json'))
   config['gemini_agent'] = {
       'enabled': True,
       'api_key_env': 'GEMINI_API_KEY',
       'model': 'gemini-pro',
       'pr_review_enabled': True,
       'code_analysis_enabled': True
   }
   json.dump(config, open('config/config.json', 'w'), indent=2)
   print('Gemini agent configuration added')
   "
   ```

3. **Gemini Agent API Integration Pattern:**
   ```python
   # Example integration in src/api/gemini_integration.py
   import google.generativeai as genai
   from fastapi import APIRouter, HTTPException
   import os
   
   router = APIRouter()
   
   @router.post("/gemini-analyze")
   async def analyze_code_with_gemini(code: str, task: str):
       try:
           genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
           model = genai.GenerativeModel('gemini-pro')
           
           prompt = f"Analyze this code for {task}: {code}"
           response = model.generate_content(prompt)
           
           return {"analysis": response.text, "status": "success"}
       except Exception as e:
           raise HTTPException(status_code=500, detail=str(e))
   ```

4. **Validation for Gemini Integration:**
   ```bash
   # Test Gemini agent compatibility (without API key)
   python3 -c "
   import json
   from pathlib import Path
   
   # Verify Gemini-compatible config exists
   config = json.load(open('config/config.json'))
   gemini_config = config.get('gemini_agent', {})
   print(f'Gemini config loaded: {bool(gemini_config)}')
   print(f'Model configured: {gemini_config.get(\"model\", \"Not set\")}')
   print('Gemini agent onboarding: COMPLETE')
   "
   ```

### Cross-Agent Collaboration Patterns

#### Using @jules and @gemini-coding-agent Together:

1. **Workflow Integration:**
   ```python
   # Example: src/agents/multi_agent_workflow.py
   async def cross_pollination_workflow(task_description: str):
       # Step 1: Gemini analyzes requirements
       gemini_analysis = await analyze_with_gemini(task_description)
       
       # Step 2: Jules implements solution
       jules_implementation = await execute_jules_task(
           prompt=f"Implement: {gemini_analysis['analysis']}",
           github_repo_url="https://github.com/current/repo.git"
       )
       
       # Step 3: Cross-validation
       return {
           "gemini_analysis": gemini_analysis,
           "jules_implementation": jules_implementation,
           "collaboration_status": "success"
       }
   ```

2. **Agent Communication Protocol:**
   ```bash
   # Enable cross-agent communication
   python3 -c "
   import json
   config = json.load(open('config/config.json'))
   config['cross_agent'] = {
       'enabled': True,
       'communication_protocol': 'fastapi_endpoints',
       'shared_context': True,
       'collaboration_mode': 'active'
   }
   json.dump(config, open('config/config.json', 'w'), indent=2)
   print('Cross-agent collaboration enabled')
   "
   ```

3. **Complete Multi-Agent Test:**
   ```bash
   # Full integration test
   python3 -c "
   import json
   from fastapi import FastAPI
   
   # Verify both agents are configured
   config = json.load(open('config/config.json'))
   jules_ready = bool(config.get('jules_agent', {}).get('enabled'))
   gemini_ready = bool(config.get('gemini_agent', {}).get('enabled'))
   cross_agent_ready = bool(config.get('cross_agent', {}).get('enabled'))
   
   print(f'Jules Agent Ready: {jules_ready}')
   print(f'Gemini Agent Ready: {gemini_ready}')
   print(f'Cross-Agent Collaboration: {cross_agent_ready}')
   
   if all([jules_ready, gemini_ready, cross_agent_ready]):
       print('🚀 MULTI-AGENT SYSTEM: READY FOR CROSS-POLLINATION')
   else:
       print('⚠️  Complete onboarding steps above')
   "
   ```

### Agent Invocation Patterns

**To invoke @jules in issues/PRs:**
```markdown
@jules please analyze this FastAPI endpoint and suggest improvements for better error handling and performance.
```

**To invoke @gemini-coding-agent in issues/PRs:**
```markdown
@gemini-coding-agent review this pull request for security vulnerabilities and coding best practices.
```

**For cross-agent collaboration:**
```markdown
@jules and @gemini-coding-agent please collaborate on implementing a new authentication system:
- @gemini-coding-agent: analyze security requirements and best practices
- @jules: implement the solution based on the analysis
- Both: cross-validate the final implementation
```

### Multi-Agent Development Workflow

1. **Issue Creation**: Tag both agents for different perspectives
2. **Code Analysis**: @gemini-coding-agent provides technical analysis
3. **Implementation**: @jules handles code generation and PR creation
4. **Review**: Both agents cross-validate the solution
5. **Deployment**: Automated testing and validation using the existing FastAPI framework

This multi-agent approach leverages the strengths of both agent types for optimal development outcomes and knowledge cross-pollination.