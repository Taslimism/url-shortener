const form = document.querySelector('.form');
const input = document.querySelector('input');
const button = document.querySelector('button');
let btn;
let copybtn;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData = encodeURIComponent(input.name)+'='+encodeURIComponent(input.value);
    
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body : formData
    }
    fetch('https://url-srtnr.herokuapp.com/',options)
    .then(response => {
        return response.json()})
    .then(data => {
        input.value = data.shortUrl;
        button.disabled = true;
        btn = document.createElement('button');
        document.body.appendChild(btn);
        btn.classList.add('copy-btn');
        btn.textContent = 'Copy';
        copybtn = document.querySelector('.copy-btn');
        copybtn.addEventListener('click',()=>{
            btn.textContent = 'Copied';
            setTimeout(()=> btn.textContent = "Copy",4000);
            input.select();
            document.execCommand('copy');
        })
        input.addEventListener('input',()=>{
            button.disabled=false;
            document.body.removeChild(btn);
        })
    });

})




