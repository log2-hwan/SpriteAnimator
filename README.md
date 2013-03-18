#SpriteAnimator
==============

sprite animation for css3 keyframe animation

##Usage

###SpriteAnimation.addAnimation

    1. name - name of animation
    2. configs - configuration of animation
        1) selector - selector of html elements for displaying animation,
        2) duration - duration of animation,
        3) size - size of el
            1] width - width of el in pixel
            2] height - height of el in pixel
        4) sprite - sprite using in animation
            1] cellSize - size of sprite cell
                width - width of cell in pixel
                height - height of cell in pixel
            2] url - url of sprite image

###SpriteAnimation.removeAnimation

    1. name - name of animation to remove

###SpriteAnimation.start

    1. name - name of animation to play
    
##Example

###HTML

    <div id="test"></div>

###Javascript

    SpriteAnimator.addAnimation('test', {
        selector:'#test',
        duration:0.5,
        size: {
            width: 200,
            height: 2000,
        },
        sprite: {
            cellSize: {
                width: 200,
                height: 200,
            },
            url:'test.png'
        }
    });
    SpriteAnimator.start('test');
