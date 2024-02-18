const left = document.querySelector('.left');
        left.addEventListener('click', ()=>{
            window.location.href = './index.html';
        })

// Получаем параметры из URL
const queryParams = new URLSearchParams(window.location.search);

// Получаем значение параметра postId
const postId = queryParams.get('postId');
const section = queryParams.get('section');
let container = document.querySelector('.container_2');
let content = document.querySelector('.content')


fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=HPg4WUN3GGf0GWxRClGQUclscjTl1oxb`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        if (postId) {
            const selectedPost = data.results.find(post => post.section === section && post.byline === postId);
            container.remove()
            console.log('Selected Post:', selectedPost);
            console.log(selectedPost.title)
        const dateObj = new Date(selectedPost.created_date);
        const month = new Intl.DateTimeFormat('en',{month:'long'}).format(dateObj);
        const day = dateObj.getDate();
        var randomNumber1 = Math.floor(Math.random() * (2000 - 10 + 1)) + 10;
        var randomNumber2 = Math.floor(Math.random() * (1000 - 15 + 1)) + 15;
        var randomNumber3 = Math.floor(Math.random() * (500 - 3 + 1)) + 3;
        content.innerHTML += 
                `
            <main class="container_2">    
                <div class="top_content">
                <div class="imgAndText">
                    <div >
                        <img src="${selectedPost.multimedia[2]['url']}" alt="author" class="icon_img">
                    </div>
                    <div class="div_author">
                        <div class="Author_name">${selectedPost.byline}</div>
                        <div class="list_tag">
                            <p>${day +' '+month}</p>
                            <p>·</p>
                            <p>12 min read</p>
                            <p>·</p>
                            <p>Member-only</p>
                        </div>
                    </div>
                </div>
                
                <div class="list_icon">
                    <img src="./images/LinkedIn.svg" alt="LinkedIn" class="social_icon">
                    <img src="./images/Facebook_Circled.svg" alt="Facebook"class="social_icon">
                    <img src="./images/Twitter.svg" alt="Twitter" class="social_icon">
                </div>
                </div>
                
                
                
                <div class="div2">
                <div class="title">${selectedPost.title}</div>
                <div class="mini_text">${selectedPost.des_facet[0]}</div>
                </div>
                
                <div>
                <img src="${selectedPost.multimedia[2]['url']}" alt=""  class="main_img">
                </div>
                
                <div class="main_text">
                <div class="main_title">${selectedPost.geo_facet[0]}</div>
                <div class="description_text">
                <p> ${selectedPost.abstract}</p>
                </div>
                </div>
                
                <div class="iconki">
                <div class="likeAndComment">
                    <div class="like">
                        <img src="./images/Heart.svg" alt="heart" class="icony">
                        <p>${randomNumber1}</p>
                    </div>
                    <div class="comment">
                        <img src="./images/Speech_Bubble.svg" alt="message" class="icony">
                        <p>${randomNumber2}</p>
                    </div>
                </div>
                
                <div class="favorite">
                    <img src="./images/Bookmark.svg" alt="Bookmark" class="icony">
                    <p>${randomNumber3}</p>
                </div>
                </div>
            </main>
                `


        }
        
       
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

 