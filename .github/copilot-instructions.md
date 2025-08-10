# Indian-Equity

Indian-Equity is currently a minimal repository intended for Indian equity market analysis and research. The repository is in its initial state with only basic documentation.

**ALWAYS follow these instructions first and ONLY fallback to additional search and context gathering if the information in the instructions is incomplete or found to be in error.**

## Repository Status
- **Current State**: Minimal repository with only README.md
- **No Build System**: No package.json, requirements.txt, or other dependency files exist
- **No Tests**: No test framework or test files present
- **No CI/CD**: No GitHub Actions workflows configured
- **Available Tools**: Python 3.12.3, Node.js v20.19.4, npm 10.8.2, Git 2.50.1

## Working Effectively

### Repository Structure
```
/home/runner/work/Indian-Equity/Indian-Equity/
├── .git/
├── .github/
│   └── copilot-instructions.md
└── README.md
```

### Initial Setup
DO NOT attempt to run build or install commands - this repository currently has no build system or dependencies.

1. **Always start with repository verification**:
   ```bash
   git status                    # Check working directory state
   git branch                   # Verify current branch
   ls -la                       # Confirm repository structure
   ```

2. **Verify development environment is ready**:
   ```bash
   python3 --version            # Must show Python 3.12.3
   node --version              # Must show v20.19.4  
   npm --version               # Must show 10.8.2
   git --version               # Must show git version 2.50.1
   ```

3. **DO NOT run these commands in current state** (no package files exist):
   - `npm install` - will fail, no package.json exists
   - `pip install -r requirements.txt` - will fail, no requirements.txt exists  
   - `python setup.py install` - will fail, no setup.py exists

### Common Development Patterns for Indian Equity Projects

Since this appears to be intended for Indian equity market analysis, typical development workflows would include:

#### For Python-based Analysis:
If adding Python components:
1. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Linux/Mac
   ```

2. **Install Common Dependencies** (when requirements.txt is added):
   ```bash
   pip install -r requirements.txt  # When file exists
   ```

3. **Common Libraries for Indian Equity Analysis**:
   - pandas, numpy (data manipulation)
   - yfinance (Yahoo Finance data)
   - nsepy (NSE data)
   - matplotlib, seaborn (visualization)
   - jupyter (notebooks)

#### For Node.js-based Applications:
If adding Node.js components:
1. **Initialize Project**:
   ```bash
   npm init -y  # When creating package.json
   ```

2. **Install Dependencies**:
   ```bash
   npm install  # When package.json exists
   ```

## Validation
**CRITICAL**: Since no application exists yet, DO NOT attempt to run non-existent commands.

### NEVER run these commands (they will fail):
- `npm start` - no package.json exists
- `python main.py` - no main.py exists  
- `jupyter notebook` - jupyter not installed
- `pytest` - no tests exist
- Any build or test commands

### DO run these validation commands:
1. **Always verify repository state**:
   ```bash
   git status                   # Check for uncommitted changes
   git log --oneline -5        # View recent commits  
   ls -la                      # Confirm file structure
   ```

2. **Test basic functionality when developing**:
   - For Python: Create and test virtual environment with `python3 -m venv test_env`
   - For Node.js: Test npm initialization with `npm init -y` (clean up afterward)
   - Always clean up test files and directories

## Development Guidelines

### Code Organization:
When developing, organize code as follows:
- `/data/` - Raw and processed data files
- `/notebooks/` - Jupyter notebooks for analysis
- `/src/` - Source code modules
- `/tests/` - Test files
- `/docs/` - Documentation
- `/scripts/` - Utility scripts

### Indian Equity Market Context:
- Use NSE (National Stock Exchange) symbols format: "SYMBOL.NS"
- Be aware of Indian market hours (9:15 AM - 3:30 PM IST)
- Consider Indian holidays when working with market data
- Common indices: NIFTY 50, SENSEX, NIFTY BANK

### Git Workflow:
1. **ALWAYS check status before making changes**:
   ```bash
   git status                   # Must show clean or expected state
   git branch                   # Verify you're on correct branch  
   ```

2. **Make and commit changes**:
   ```bash
   git add .                    # Stage all changes
   git commit -m "Descriptive commit message"  # Commit with clear message
   ```

3. **Push changes**:
   ```bash
   git push origin <branch-name>  # Push to remote branch
   ```

4. **ALWAYS review changes before committing**:
   ```bash
   git diff                     # Review unstaged changes
   git diff --cached            # Review staged changes
   ```

## Common Tasks

### Repository Information:
**Current Repository Root (`ls -la`):**
```
total 16
drwxr-xr-x 3 runner docker 4096 Aug 10 17:50 .
drwxr-xr-x 3 runner docker 4096 Aug 10 17:49 ..
drwxr-xr-x 7 runner docker 4096 Aug 10 17:50 .git
-rw-r--r-- 1 runner docker   15 Aug 10 17:50 README.md
```

**Current README.md Content:**
```
# Indian-Equity
```

## Build and Test Timing Expectations

**CRITICAL**: NO build or test commands exist in current repository state.

### When Build System is Added:
- **NEVER CANCEL** any build or test commands that may be added later
- Set timeouts to 60+ minutes for any future build commands  
- Set timeouts to 30+ minutes for any future test commands
- Document actual timing when build system is implemented

### Current Command Timings (Validated):
- `git status` - < 1 second
- `python3 --version` - < 1 second  
- `node --version` - < 1 second
- `ls -la` - < 1 second
- `python3 -m venv venv` - 2-5 seconds
- `npm init -y` - 1-2 seconds

All documented commands have been tested and work correctly.
- **Python**: 3.12.3 (available via `python3`)
- **Node.js**: v20.19.4
- **npm**: 10.8.2
- **Git**: 2.50.1
- **Jupyter**: Not currently installed
- **Working Directory**: `/home/runner/work/Indian-Equity/Indian-Equity`

### Future Development Notes:
- Repository is ready for development but has no existing codebase
- No build times to document as no build system exists
- No test execution times as no tests exist
- When adding dependencies, document installation and build times
- Consider adding GitHub Actions workflows for CI/CD when codebase develops

## Troubleshooting

### Expected Failures (DO NOT attempt to fix these):
- **`npm install` fails**: No package.json exists - this is expected
- **`pip install -r requirements.txt` fails**: No requirements.txt exists - this is expected  
- **`python main.py` fails**: No main.py exists - this is expected
- **`npm start` fails**: No package.json with start script exists - this is expected
- **`jupyter notebook` fails**: Jupyter not installed - this is expected for minimal setup

### Unexpected Issues:
- **Commands taking longer than documented**: Wait for completion, DO NOT cancel
- **Git commands failing**: Check network connectivity and repository permissions
- **Python/Node version mismatches**: Verify environment setup

### Emergency Recovery:
If you make changes and need to reset:
```bash
git status                      # Check what changed
git diff                        # Review changes  
git checkout -- <filename>     # Reset specific files
git clean -fd                   # Remove untracked files (use with caution)
```

## Next Steps for Development:
1. Define project scope (data analysis, web app, API, etc.)
2. Choose technology stack (Python for analysis, Node.js for web, etc.)
3. Add appropriate package management files
4. Set up development environment
5. Add CI/CD workflows
6. Create proper project structure
7. Update these instructions with specific build and test commands

Always check the current state of the repository before following development instructions, as the project structure may evolve from this minimal starting point.