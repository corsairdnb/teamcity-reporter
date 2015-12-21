var processUrl = function(requestUri, redirectUri){
    var response;

    var options = {
        host: 'www.wrike.com',
        base: '/blog',
        port: 443,
        path: requestUri,
        method: 'GET'
    };

    response = {
        location: options.host + options.path,
        status: null,
        headers: null,
        body: null,
        errors: null
    };

    function replaceHost(url){
        return url.replace('https://' + options.host, '');
    }

    function replaceEndSlash(url){
        return url.replace(/\/$/, '');
    }

    redirectUri = replaceHost(redirectUri);

    var req = https.request(options, function(res) {
        response.status = res.statusCode;
        response.headers = res.headers;

        if (res.headers.hasOwnProperty('location')) {
            if (replaceHost(replaceEndSlash(res.headers['location'])) !== replaceEndSlash(redirectUri)) {
                response.errors = true;
            }
        }

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log(response.body);
            //response.body += chunk;
        });
        res.on('end', function () {
            socket.emit('url_processed', response);
            iterations++;
            if (iterations > dataLength - 1) {
                socket.emit('server_signal_completed', new Date());
                processIsRun = false;
                iterations = 0;
                console.log(chalk.blue('process completed at ') + new Date());
            }
        });
    });

    req.on('error', function(e) {
        response.errors = e;
        console.log(chalk.blue(e));
    });

    req.end();
};