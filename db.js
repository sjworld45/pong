let high_id = ""

// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

db.collection('high-score').onSnapshot(snapshot => {
    console.log(snapshot.docChanges())
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.id)
        if(change.type === 'modified') {
            console.log(change.doc.data());
            high_db = change.doc.data().score
            high_id = change.doc.id
            set_high()
        }
    })
})