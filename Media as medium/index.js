
function getPost() {
    let container = document.querySelector('.container');
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=HPg4WUN3GGf0GWxRClGQUclscjTl1oxb')
    .then((response) => response.json())
    .then((data)=>{
        console.log(data)
        data.results.splice(0,7).forEach((item,ind)=>{
            console.log(item)
            const dateObj = new Date(item.created_date);
            const month = new Intl.DateTimeFormat('en',{month:'long'}).format(dateObj);
            const day = dateObj.getDate();
            container.innerHTML += 
            `
            <div class="first">
                <div class="block" data-postid="${item.byline}" data-section="${item.section}">
                    <div class="left_content">
                        <div class="author_div">
                            <img src="${item.multimedia[2]['url']}" alt="icon" class="icon_img">
                            <p class="Author_name">${item.byline}<span class="gray_font">in</span> ${item.section} ⋅ <span class="gray_font">${day +' '+month}</span></p>
                        </div>
                        <p class="title">${item.title}</p>
                        <p class="description">${item.abstract}</p>
                        <div class="bottom">
                            <div class="left_side">
                                <button class="btn_java">Java Script</button>
                                <p id="min" class="gray_font">12 min read </p>
                                <p>⋅</p>
                                <p id="sel" class="gray_font">Selected for you</p>
                            </div>
                            <div class="right_side">
                                <img src="./images/Ico1.png" alt="">
                                <img src="./images/Ico1.png" alt="">
                                <img src="./images/Ico1.png" alt="">
                        </div>
                        </div>
                    </div>
                    <div class="right_content">
                        <img src="${item.multimedia[2]['url']}" alt="main" class="main_img">
                    </div>
                </div> 
                <hr>
            </div>`
        })
        addClickEventToPosts();
    })
}

function addClickEventToPosts() {
    const postBlocks = document.querySelectorAll('.block');

    postBlocks.forEach((block) => {
        block.addEventListener('click', () => {
        
            const postId = block.getAttribute('data-postid');
            const section = block.getAttribute('data-section');
            // Переходим на другую страницу, передавая postId в URL параметрах
            window.location.href = `./index2.html?postId=${postId}&section=${section}`;
        });
    });
}

getPost();

