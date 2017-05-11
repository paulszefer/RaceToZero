var count = 0;
    
    function displayImage() {
        var imagesArray = ['img/sushi.jpg', 'img/pbsandwich.jpg', 'img/coconut.jpg', 'img/apples.png', 'img/frenchtoast.png', 'img/setprofilepic.png'];
        
        document.canvas.src = imagesArray [count];
        count++;
            if (count % 6 == 0){
                count = 0;
            }
    }