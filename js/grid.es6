jQuery(function($){
  'use strict';
  let data = load("data.json"),
      target = $('table'),
      firstYear,
      lastYear = (new Date()).getFullYear(),
      numYears;

  data.then(function(data){
    data.sort(function(a,b){
      return a.reign[0].start < b.reign[0].start ? -1 : 1;
    });

    firstYear = data[0].birth;
    numYears = lastYear - firstYear + 1;

    let offset = 100 - (firstYear % 100),
        labelRow = $('<tr class="label">');

    labelRow.append(`<td colspan="${offset + 2}">${firstYear + offset}</td>`);

    for(let y = firstYear + offset + 100; y < lastYear; y += 100){
      labelRow.append(`<td colspan="100">${y}</td>`);
    }

    target.append(labelRow);

    data.forEach(function(m){
      let row = $('<tr>');

      row.append(`<td>${m.name}</td>`);

      for(let year = firstYear; year <= lastYear; year++){
        let classes = [];
        if(year >= m.birth && (!m.death || year <= m.death)){
          classes.push("alive");
        }
        for(let reign of m.reign){
          if(year >= reign.start && (!reign.end || year <= reign.end)){
            classes.push(`reign-${reign.kingdom.toLowerCase()}`);
          }
        }
        row.append(`<td class="${classes.join(" ")}"></td>`);
      }

      target.append(row);
    });
  });

  function load(url){
    return new Promise(function(success, error){
      $.ajax({type: "get", url, success, error});
    });
  }
});
