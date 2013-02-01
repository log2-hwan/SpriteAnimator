/*
 * name - name of animation
 * config - configuration of animation
 * selector - selector of html elements for displaying animation,
 * duration - duration of animation,
 * size - size of el
 *	= width - width of el in pixel
 *	= height - height of el in pixel
 * sprite - sprite using in animation
 * 	= cellSize - size of sprite cell
 *		1) width - width of cell in pixel
 * 		2) height - height of cell in pixel
 *	= url - url of sprite image
 * 
 * Example
 * SpriteAnimator.addAnimation('test', {
 * 		selector:'#test',
 *		duration:0.5,
 *		size: {
 *			width: 200,
 *			height: 2000,
 *		},
 *		sprite: {
 *			cellSize: {
 *				width: 200,
 *				height: 200,
 *			},
 *			url:'test.png'
 *		}
 * });
 * SpriteAnimator.start('test');
 */
var SpriteAnimator = (function() {
	var animations = {};
	var getPrefix = function() {
	    var el = document.createElement( "div" ), prefixes = ["Webkit", "Moz", "O", "ms"];
	    for ( var i = 0; i < prefixes.length; i++ )
	        if ( prefixes[i] + "Transition" in el.style )
	            return prefixes[i];
	    return "transition" in el.style ? "" : false;
	};
	var prefix = getPrefix();
	if(!prefix) return console.log('your browser does not support css3 keyframe animation');
	prefix = prefix.toLowerCase();
	var addAnimation = function(name,configs) {
		if(animations[name]) return;
		var widthNum = parseInt(configs.size.width/configs.sprite.cellSize.width);
		var heightNum = parseInt(configs.size.height/configs.sprite.cellSize.height);
		var steps = widthNum*heightNum;
		var cssText = ['<style type="text/css" id="spriteani-'+name+'-sheet">'];
		var ruleArr = ['@-'+prefix+'-keyframes spriteani-'+name+' {'];
		for(var j=0;j<widthNum;j++)
			for(var i=0;i<heightNum;i++)
				ruleArr.push(((j*widthNum+i+1)/steps*100)+'% { background-position:'+(-configs.sprite.cellSize.width*i)+'px '+(-configs.sprite.cellSize.height*j)+'px;}');
		ruleArr.push('}');
		var rule = ruleArr.join('\n');
		cssText.push(rule);
		var classRule = '.spriteani-'+name+'-container { width:'+configs.sprite.cellSize.width+'px; height:'+configs.sprite.cellSize.height+'px; }';
		cssText.push(classRule);
		var activeRule = '.spriteani-'+name+'-container.active { background: url("'+configs.sprite.url+'"); background-position: 0px 0px; -'+prefix+'-animation: spriteani-'+name+' '+configs.duration+'s steps(1,end) infinite; }';
		cssText.push(activeRule);
		document.head.innerHTML += cssText.join('\n');
		document.head.innerHTML += '</style>';
		animations[name] = {};
		animations[name].els = document.querySelectorAll(configs.selector);
		for(var i in animations[name].els)
			animations[name].els[i].className = 'spriteani-'+name+'-container';
		animations[name].duration = configs.duration;
	};
	var start = function(name) {
		clearTimeout(animations[name].timer);
		for(var i in animations[name].els)
			animations[name].els[i].className = 'spriteani-'+name+'-container';
		setTimeout(returnAni,0,name);
	};
	var returnAni = function(name) {
		for(var i in animations[name].els)
			animations[name].els[i].className = 'spriteani-'+name+'-container active';
		animations[name].timer = setTimeout(cancelAni,animations[name].duration*1000,name);
	};
	var cancelAni = function(name) {
		for(var i in animations[name].els)
			animations[name].els[i].className = 'spriteani-'+name+'-container';
	};
	var removeAnimation = function(name) {
		document.head.removeChild(document.getElementById('spriteani-'+name+'-sheet'));
	};
	return {
		addAnimation: addAnimation,
		removeAnimation: removeAnimation,
		start: start
	}
})();