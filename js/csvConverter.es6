jQuery(function($){
  var src = "data.csv",
      data = load(src);

  data.then(function(data){
    var monarchs = [];

    data = data.split("\n");
    data.shift();
    data.forEach(function(row){
      var fields = row.split(","),
          monarch = {
            name: fields[0],
            birth: fields[1]>>0,
            death: fields[2]>>0,
            reign: [{
              start: fields[3]>>0,
              end: fields[4]>>0,
              kingdom: fields[5]
            }]
          };

        if(fields[6]){
          monarch.reign.push({
            start: fields[6]>>0,
            end: fields[7]>>0,
            kingdom: fields[8]
          });

          if(fields[9]){
            monarch.reign.push({
              start: fields[9]>>0,
              end: fields[10]>>0,
              kingdom: fields[11]
            });
          }
        }

      monarchs.push(monarch);
    })
    $('#out').text(JSON.stringify(monarchs));
  });

  function load(url){
    return new Promise(function(success, error){
      $.ajax({
        type: "get",
        url,
        success,
        error,
      });
    });
  }
});
