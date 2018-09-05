rm -rf dist &&\
    npm run build &&\
    cd dist &&\
    ssh -t -p1987 root@web.sx.p4x.com 'rm -rf /home/www/runcuo/frontend/* && ls -al /home/www/runcuo/frontend/' &&\
    rsync -rvz -e 'ssh -p 1987' --progress --remove-sent-files . root@web.sx.p4x.com:/home/www/runcuo/frontend/