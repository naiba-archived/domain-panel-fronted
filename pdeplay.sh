rm -rf dist &&\
    npm run build &&\
    cd dist &&\
    ssh -o ProxyCommand='nc -x 127.0.0.1:1086 %h %p' -t -p1987 root@web.sx.p4x.com 'rm -rf /home/www/runcuo/frontend/* && ls -al /home/www/runcuo/frontend/' &&\
    rsync -rvz -e "ssh -p 1987 -o ProxyCommand='nc -x 127.0.0.1:1086 %h %p'" --progress --remove-sent-files . root@web.sx.p4x.com:/home/www/runcuo/frontend/