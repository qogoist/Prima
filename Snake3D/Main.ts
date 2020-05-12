namespace Snake3D {
    import ƒ = FudgeCore;

    export let viewport: ƒ.Viewport;

    let snake: Snake;
    let food: Food;
    let game: ƒ.Node;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game = new ƒ.Node("Game");

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        cmpCamera.pivot.rotateY(180);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);

        ƒ.Debug.log(viewport);

        snake = new Snake("Snake", 4);
        food = new Food("Food");

        viewport.draw();

        game.addChild(snake);
        // game.addChild(food);

        // food.randomizeLocation();

        document.addEventListener("keydown", control);

        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 2, false);
    }

    function update(_event: Event): void {
        snake.move();

        // checkCollision();

        viewport.draw();
    }

    // function checkCollision(): void {
    //     if (snake.head.collidesWith(food))
    //         snake.grow();
    // }

    function control(_event: Event): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
            snake.rotate(ƒ.Vector3.Y(90));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
            snake.rotate(ƒ.Vector3.Y(-90));
    }
}