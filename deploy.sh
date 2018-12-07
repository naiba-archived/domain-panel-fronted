rm -rf dist &&\
    npm run build &&\
    cd dist &&\
    ssh -t -p60030 root@ca.sx.p4x.com 'rm -rf /NAIBA/www/runcuo/frontend* && ls -al /NAIBA/www/runcuo/frontend' &&\
    rsync -rvz -e 'ssh -p 60030' --progress --remove-sent-files . root@ca.sx.p4x.com:/NAIBA/www/runcuo/frontend