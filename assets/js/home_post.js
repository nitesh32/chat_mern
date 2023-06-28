{
    let createpost =function(){

    let newpostform = $(`#feed_post_form`);
    console.log(newpostform[0]);
    newpostform[0].submit(function(e){
        e.preventDefault();
    });

    } 
    
    createpost();
}