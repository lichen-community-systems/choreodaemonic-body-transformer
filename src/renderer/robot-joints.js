export class RobotJoints {
    constructor(homePositions, scaling, mappings) {
        /*
            [
                [0.2, 0.7],
                [0.0, 0.92]
            ]
        */
        this.model = [];
        this.homePositions = homePositions;
        this.scaling = scaling;

        /*
            [
                "nose",
                "left elbow",
                "left knee"
                ...
                "right foot"
            ]
        */
        this.mappings = mappings;
        this.initDefaultModel();
    }

    initDefaultModel() {
        // Initialize all keypoints
        for (let i = 0; i < this.homePositions.length; i++) {
            this.model[i] = this.homePositions[i];
        }
    }

    update(keypointsModel) {
        for (let i = 0; i < this.mappings.length; i++) {
            let keypointName = this.mappings[i];
            if (!keypointName) {
                console.log("Ack! Invalid keypoint mapping!")
            }

            let keypoint = keypointsModel[keypointName];

            if (keypoint) {
                // Scale from frame coordinates to robot stage coordinates.
                let robotX = (keypoint.x + this.scaling.offsetX) *
                    this.scaling.scaleX;
                let robotY = (keypoint.y + this.scaling.offsetY) *
                    this.scaling.scaleY;
                this.model[i] = [robotX, robotY];
            } else {
                let homePosition = this.homePositions[i];
                this.model[i] = [homePosition[0], homePosition[1]];
            }
        }
    }
};
