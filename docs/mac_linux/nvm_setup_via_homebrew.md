# NVM SETUP ON MAC VIA HOMEBREW

### 1. setup homebrew

- brew.sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- brew -v

### 2. setup nvm

- brew install nvm

### 3. setup zsh and bash

- vim ~/.nvm-setup.sh - creates a common script for the bash/zsh to run

  ```
  #nvm-setup.sh

  # tells nvm to use home/.nvm as a directory for usage
    export NVM_DIR="$HOME/.nvm"

  # Load nvm if abailable
    if [ -s  "$(brew --prefix nvm)/nvm.sh"]; then
      . "$(brew --prefix nvm)/nvm.sh"
    fi

  # Load syntax completion for using nvm
    if [ -s  "$(brew --prefix nvm)/etc/bash_completion.d/nvm"]; then
      . "$(brew --prefix nvm)/etc/bash_completion.d/nvm"
    fi
  ```

- add "source ~/.nvm-setup.sh" to .zshrc and .bashrc

  ```
  # .zshrc
    source ~/.nvm-setup.sh
  ```

  ```
  # .bashrc
    source ~/.nvm-setup.sh
  ```

### 4. create .nvm directory (optional(?))

- mkdir ~/.nvm - create directory for nvm to use, nvm SOMETIMES requires it
