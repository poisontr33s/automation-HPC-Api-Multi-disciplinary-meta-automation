const ua = process.env.npm_config_user_agent || "";
if (ua.includes("npm")) {
  console.error(
    "[security] This repo is set up for pnpm or bun. Please avoid using npm for installs."
  );
}