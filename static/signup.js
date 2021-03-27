var result = document.getElementById('random_String'); 
	function random_String_Generator() { 
		result.innerHTML = Math.random().toString(36).slice(2); 
	} 