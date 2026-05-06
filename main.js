const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "./targets.mind",
    });

    const { renderer, scene, camera } = mindarThree;

    // 💡 Light (model visible aaganum)
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // 🎯 Anchor
    const anchor = mindarThree.addAnchor(0);

    // 🐱 GLTF Loader
    const loader = new THREE.GLTFLoader();

    loader.load(
      "./model.glb", // 🔥 un file name match aaganum

      (gltf) => {
        const model = gltf.scene;

        // 🔧 Adjust size
        model.scale.set(0.7, 0.7, 0.7);

        // 🔧 Position
        model.position.set(0, 0, 0);

        // 🔧 Rotation (if needed)
        model.rotation.x = -Math.PI / 2;

        anchor.group.add(model);

        console.log("MODEL LOADED ✅");
      },

      undefined,

      (error) => {
        console.error("ERROR ❌", error);
      }
    );

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  start();
});
