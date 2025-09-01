// zcash-backend.js
const { exec } = require('child_process');
const path = require('path');

class ZcashDevBackend {
    constructor(walletPath = '../dev-wallet') {
        this.walletPath = walletPath;
        this.toolPath = path.join(__dirname, '../zcash-devtool');
    }

    async runCommand(command) {
        return new Promise((resolve, reject) => {
        const cmd = `cd ${this.toolPath} && cargo run --release --all-features -- wallet -w ${this.walletPath} ${command}`;

        console.log(cmd);
      
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject({ error: error.message, stderr });
            } else {
            // In runCommand method, replace the try/catch with:
                try {
                    // Look for JSON-like structure in the output
                    const jsonMatch = stdout.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const result = JSON.parse(jsonMatch[0]);
                        resolve(result);
                    } else {
                        resolve({ output: stdout.trim() });
                        }
                    } catch {
                        resolve({ output: stdout.trim() });
                    }
                }
            });
        });
    }

  // Wallet operations
    async getBalance() {
        return this.runCommand('balance');
    }

    async getAddresses() {
        return this.runCommand('list-addresses');
    }

    // async createAddress(type = 'unified') {
    //     return this.runCommand(`generate-address --type ${type}`);
    // }

    async getTransactions() {
        return this.runCommand('list-tx');
    }

    // async sendTransaction(to, amount, memo = '') {
    //     const memoFlag = memo ? `--memo "${memo}"` : '';
    //     return this.runCommand(`send ${to} ${amount} ${memoFlag}`);
    // }

    async sync() {
        return this.runCommand('sync -s zecrocks');
    }
}

module.exports = { ZcashDevBackend };