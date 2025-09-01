working node for zcash  -- jeffrey



clone github dev tools from 

https://github.com/zcash/zcash-devtool/tree/main


then run

1. cargo run --release --all-features -- --help

2. cargo run --release --all-features -- wallet -w ../dev-wallet init --name "ZDevTest" \
  -i ../dev-wallet/dev-key.txt -n test -s zecrocks

3. cargo run --release --all-features -- wallet -w ../dev-wallet list-addresses
