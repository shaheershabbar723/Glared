# GitHub Setup Instructions

## Finding Developer Settings

1. Go to https://github.com and sign in to your account
2. Click on your profile picture in the top right corner
3. Select "Settings" from the dropdown menu
4. Scroll down to the bottom of the left sidebar
5. You should see "Developer settings" at the bottom of the menu

## Creating a Personal Access Token

1. In Developer Settings, click on "Personal access tokens"
2. Click on "Tokens (classic)"
3. Click "Generate new token" → "Generate new token (classic)"
4. Give it a name like "Glared Project"
5. Select the `repo` scope (full control of private repositories)
6. Click "Generate token" at the bottom
7. Copy the generated token (you won't see it again)

## Using the Token to Push Changes

1. Open your terminal in the project directory
2. Run this command (replace YOUR_TOKEN with the actual token):
   ```
   git remote set-url origin https://YOUR_TOKEN@github.com/shaheershabbar723/glared-ai-fashion-photography.git
   ```
3. Then push the changes:
   ```
   git push -u origin main
   ```

If you can't find Developer Settings, you might be on a mobile device or using a different GitHub interface. Let me know and I can provide alternative instructions.