//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////

AFRAME.registerSystem('ammo-world', {
	init: function () {
                var ammoWorld = new THREEx.AmmoWorld()
		// ammoWorld.collisionEnabled = true
		this.ammoWorld = ammoWorld
	},
	tick: function (now, delta) {
                this.ammoWorld.update()
	},
});

AFRAME.registerComponent('ammo-controls', {
        dependencies: ['ammo-world'],
	schema: {
                mass : {
                        type: 'number',
                        default: NaN,
                },
                restitution : {
                        type: 'number',
                        default: 0.9,
                },
                friction : {
                        type: 'number',
                        default: 0.99,
                },
                angularVelocity : {
                        type: 'vec3',
                        default: "0 0 0",
                },
                linearVelocity : {
                        type: 'vec3',
                        default: "0 0 0",
                },
	},
	init: function () {
                console.log('data', this.data)
                // build ammo-controls options
                var options = {}
                if( isNaN(this.data.mass) === false ){
                        options.mass = this.data.mass
                }
                // create the ammo-controls
                var ammoControls = new THREEx.AmmoControls(this.el.object3D, options)
		this.ammoControls = ammoControls
                
                // add this controls to ammoWorld
                var ammoWorld = this.el.sceneEl.systems['ammo-world'].ammoWorld
                ammoWorld.add(ammoControls)

                var vector3 = this.data.linearVelocity
                console.log('linearVelocity', vector3)
                ammoControls.setLinearVelocity(vector3.x, vector3.y, vector3.z)

                var vector3 = this.data.angularVelocity
                ammoControls.setAngularVelocity(THREE.Math.degToRad(vector3.x), THREE.Math.degToRad(vector3.y), THREE.Math.degToRad(vector3.z))
	},
        update: function(){
                this.ammoControls.setRestitution(this.data.restitution)
                this.ammoControls.setFriction(this.data.friction)
        }
});