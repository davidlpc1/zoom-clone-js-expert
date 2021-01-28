rm -rf **/**/node-modules
cp -r aula02 aula03
cd aula03
for item in `ls`;
do 
    echo $item
    cd $item
    npm ci --silent
    yarn install --frozen-lockfile
    cd ..
done