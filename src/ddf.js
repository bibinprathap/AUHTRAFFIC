app.post('/apiwithtoken', {a,b}, function(req, res){
    console.log('Accessing to grafana');
    var url = 'http://localhost:8080/api/dashboards/db/test';
    request.get(url,{
      auth: {
        bearer: 'API token from Grafana page'
      },
    });
    res.redirect(url);//response json
   });