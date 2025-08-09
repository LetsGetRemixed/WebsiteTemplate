# GitHub Actions Setup

This project includes automated CI/CD workflows using GitHub Actions for testing, building, and deploying your website template.

## 📋 Available Workflows

### 1. Merge Workflow (`.github/workflows/merge.yml`)
**Triggers:** Push to main/master branch, Pull requests to main/master

**What it does:**
- ✅ Runs tests on Node.js 18.x and 20.x
- ✅ Installs dependencies for both root and client
- ✅ Runs linting (if configured)
- ✅ Runs tests (if configured)
- ✅ Builds the client application
- ✅ Verifies build output
- ✅ Deploys to Firebase/Vercel (if configured)

### 2. Pull Request Workflow (`.github/workflows/pull-request.yml`)
**Triggers:** Pull requests to main/master branch

**What it does:**
- ✅ Validates code changes
- ✅ Runs security audits
- ✅ Checks for common issues
- ✅ Builds and verifies the application
- ✅ Performs code quality checks

## 🚀 Setup Instructions

### 1. Enable GitHub Actions
1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Click "Enable Actions" if not already enabled

### 2. Configure Secrets (Optional - for deployment)

#### For Firebase Deployment:
1. Go to your repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `FIREBASE_SERVICE_ACCOUNT_WEBSITE_TEMPLATE`: Your Firebase service account JSON
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID

#### For Vercel Deployment:
1. Go to your repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### 3. Test the Workflows
1. Create a pull request to test the PR workflow
2. Merge to main to test the merge workflow

## 🔧 Customization

### Adding Tests
1. Install a testing framework (Jest, Vitest, etc.)
2. Update the `test` script in `package.json`
3. Create test files in your project

### Adding Linting
1. Install ESLint and Prettier
2. Update the `lint` script in `package.json`
3. Create `.eslintrc.js` and `.prettierrc` files

### Adding More Deployment Options
1. Edit `.github/workflows/merge.yml`
2. Add new deployment steps
3. Configure the necessary secrets

## 📊 Workflow Status

You can monitor workflow status:
- In the "Actions" tab of your repository
- Via status badges in your README
- Through GitHub notifications

## 🛠️ Local Testing

Test the CI scripts locally:
```bash
# Install dependencies (CI style)
npm run ci:install

# Build the project
npm run ci:build

# Run tests
npm run ci:test

# Run linting
npm run ci:lint
```

## 🔍 Troubleshooting

### Common Issues:
1. **Build fails**: Check if all dependencies are properly installed
2. **Deployment fails**: Verify your deployment secrets are correct
3. **Tests fail**: Ensure your test configuration is correct

### Debugging:
- Check the Actions tab for detailed logs
- Use `npm run ci:install` locally to test installation
- Verify your Node.js version matches the workflow

## 📝 Best Practices

1. **Always test locally first** before pushing
2. **Use meaningful commit messages** for better tracking
3. **Keep secrets secure** and never commit them to the repository
4. **Monitor workflow performance** and optimize as needed
5. **Update dependencies regularly** to maintain security

---

For more information, see the [GitHub Actions documentation](https://docs.github.com/en/actions).
