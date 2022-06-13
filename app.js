

var postAppi='http://localhost:3000/courses';

function start()
{
	getcourses(rendercode);
	handleCreateform();
}

start();

function getcourses(callback){

	fetch(postAppi)
		.then(function(response){
			return response.json();
		})

		.then(callback)

		.catch(function(err){
			alert('loi')
		});
}

function rendercode(posts)
{
	//getElementById('post-block') == querySelector('#post-block')
	var listCourses= document.querySelector('#post-block');

	var htmls= posts.map(function(post){
		return `<li class="item-id-${post.id}">
		<h4>${post.name}</h4>
		<p>${post.description}<p>
		<button onclick=handledeletecourses(${post.id})>xoa</button>
		</li>`;
	});
	listCourses.innerHTML=htmls.join('');
}

function creatCourse(data,callback)
{
	var option={
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		  },
		body: JSON.stringify(data)
	};
	fetch(postAppi,option)
	
		.then(function(response){
			return response.json();
		})
		.then(callback);
	
}
function handleCreateform(){
	var createBtn= document.querySelector("#Create");
	createBtn.onclick=function(){
		var Name= document.querySelector('input[name="name"]').value;
		var Description= document.querySelector('input[name="description"]').value;
		
		var formData={
			name : Name,
			description : Description
		};

		creatCourse(formData,function(){
			getcourses(rendercode);
		});
	}

	
}
function handledeletecourses(id)
{
	var option={
		method:'DELETE',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		  },
		
	};
	fetch(postAppi + "/" + id ,option)
	
		.then(function(response){
			return response.json();
		})
		.then(function(option){
			var courses=document.querySelector(".item-id-"+id);
			if(courses)
			{
				courses.remove();
			}
		});
}


