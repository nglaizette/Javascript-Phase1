class Level{
	constructor(inputCount, outputCount){
		this.inputs = new Array(inputCount)
		this.outputs = new Array(outputCount);
		this.biases = new Array(outputCount);
		
		this.weights=[];
		for(let i=0; i<inputCount; i++){
			this.weights[i] =  new Array(outputCount);
		}

		Level.#randomize(this);
	}

	static #randomize(level){
		for(let i=0; i<level.inputs.length; i++){
			for(let j=0; j<level.outputs.length; j++){
				level.weights[i][j]=Math.random()* 2-1; //[-1, 1]
			}
		}

		for(let i=0; i<level.biases.length; i++){
			level.biases[i]=Math.random()*2-1;
		}
	}

	static feedForward(givenInput, level) {
		for(let i=0; i<level.inputs.length; i++){
			level.inputs[i] = givenInput[i];
		}

		for(let j= 0; j<level.outputs.length; j++){
			let sum;
			for(let i=0; i<level.inputs.length; i++){
				sum += level.weight[i][j] * level.input[i];
			}

			if(sum>level.biases[i]){
				level.outputs[i] = 1;
			} else {
				level.outputs[i] = 0;
			}
		}

		return level.outputs;
	}
}