# NVM SETUP ON MAC VIA HOMEBREW

### 1. go to NvmNode.com

- https://www.nvmnode.com/guide/installation-sh.html

### 2. run installation script

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### 3. check zsh and bash setup

- the installation script should have added the following setup to .zshrc

  ```
  #zshrc.sh

    export NVM_DIR="$HOME/.nvm"

    [ -s  "$NVM_DIR/nvm.sh"] && "$NVM_DIR/nvm.sh"
    # This loads nvm

    [ -s "$NVM_DIR/bash_completion"] && "$NVM_DIR/bash_completion"
    # this loads nvm bash_completion
  ```

- add "source ~/.nvm-setup.sh" to .zshrc and .bashrc

# REMOVE .ZSHRC FILE AND RUN INSTALLATION SCRIPT AGAIN TO TEST IF IT CREATES THE CODE IN .BASHRC WHEN .ZSHRC IS MISSING!!!!

```
# .bashrc
  source ~/.nvm-setup.sh
```

### 4. create .nvm directory (optional(?))

- mkdir ~/.nvm - create directory for nvm to use, nvm SOMETIMES requires it
