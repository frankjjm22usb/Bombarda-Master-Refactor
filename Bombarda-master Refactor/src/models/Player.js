class Player {
    constructor(name, element, control, radius, ap = {}) {
        this.name = name;
        this.control = control;
        this.element = element;
        this.label = this.getLabel();
        this.radius = radius;
        this.potenciaBomba = 2;
        this.vidas = 4;
        this.score = 0;
        this.vy = 0;
        this.vx = 10;
        this.m = 2;

        if ("label" in ap) {
            if (ap.label) {
                this.showLabel();
            }
        }
    }

    set element(mesh) {
        if (mesh instanceof THREE.Mesh) {
            this._element = mesh;
        } else {

            let geometry = new THREE.SphereGeometry(25, 32, 32);
            let material = new THREE.MeshPhongMaterial({
                color: 0x3498db,
                wireframe: false
            });

            var object1 = new THREE.Mesh(geometry, material);
            object1.castShadow = true;
            object1.receiveShadow = true;

            var caja = new THREE.Mesh(
                new THREE.BoxGeometry(50, 50, 50),
                new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, transparent: true, opacity: 0.0 })
            );


            var num = 0;
            var creado = false;
            for (const player of Object.keys(players)) {
                if (players[player] == null && !creado) {
                    switch (num) {
                        case 0:
                            object1.position.x = 1425;
                            object1.position.y = 25;
                            object1.position.z = 1425;
                            creado = true;
                            break;
                        case 1:
                            object1.position.x = -1425;
                            object1.position.y = 25;
                            object1.position.z = 1425;
                            creado = true;
                            break;
                        case 2:
                            object1.position.x = -1425;
                            object1.position.y = 25;
                            object1.position.z = -1425;
                            creado = true;
                            break;
                        case 3:
                            object1.position.x = 1425;
                            object1.position.y = 25;
                            object1.position.z = -1425;
                            creado = true;
                            break;
                    }
                }
                num++;
                if (creado) {
                    break;
                }
            }

            // console.log(object1.position);
            // object1.name = "Player";


            object1.add(caja);
            this._element = object1;

            this._element.name = "Player";
            collidableDestructible.push(this._element);
            collidableList.push(this._element);
            console.log(this._element.name);
        }
        this.control.element = this._element;
        // collidableList.push(this.control.element);
    }

    get element() {
        return this._element;
    }
    // get control() {
    //     return this._control;
    // }


    updateControls() {
        this.control.update(this.vx, this.vy, this.m, 90, this.potenciaBomba);
    }

    getLabel() {
        return Utilities.label(
            this.element.position,
            Utilities.textTure(this.name, 10, "Bold", "10px", "Arial", "0,0,0,1", 64, 50)
        )
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        let uiElement = document.querySelector(`#${this.name} .score`);
        console.log(uiElement)
        if (uiElement != undefined) {
            uiElement.innerHTML = this.score;
            console.log("creado")
        }
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        let uiElement = document.querySelector(`#${this.name} .name`);
        console.log(uiElement);
        if (uiElement != undefined) {
            uiElement.innerHTML = this.name;
        }
    }

    setUpUI() {
        //wrapper
        let playerUI = document.createElement("div");
        playerUI.id = this.name;
        playerUI.classList.add("playerUI");

        //Name
        let playerName = document.createElement("div");
        playerName.classList.add("name");
        playerName.innerHTML = this.name;

        //Score
        let scoreField = document.createElement("div");
        scoreField.classList.add("score");
        scoreField.innerHTML = this.score;

        playerUI.appendChild(playerName);
        playerUI.appendChild(scoreField);

        document.body.appendChild(playerUI);
    }

    showLabel() {
        this.element.add(this.label);
    }

    play(scene) {
        // console.log('Jugador');
        // console.log(this);
        this.collidableBox = new CollidableBox(this._element, 25);
        scene.add(this.element);
        this.setUpUI();
    }

}