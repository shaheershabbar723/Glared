# PowerShell script to apply changes to a new repository
# This script assumes you have a new, empty GitHub repository

# Set your GitHub username and repository name
$GITHUB_USERNAME = "your-username"
$REPO_NAME = "glared-ai-fashion-photography"

# Set your personal access token
$GITHUB_TOKEN = "your-personal-access-token"

# Clone the new repository
git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
cd $REPO_NAME

# Copy all files from the current project (except .git directory)
# This assumes the script is run from the project directory
Get-ChildItem -Path ".." -Exclude ".git" | Copy-Item -Destination "." -Recurse

# Add all files
git add .

# Commit changes
git commit -m "Add all GLARED project files including Privacy Policy page"

# Set the remote URL with authentication
git remote set-url origin https://$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to the repository
git push -u origin main

Write-Host "Changes have been pushed to $GITHUB_USERNAME/$REPO_NAME"