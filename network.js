class NeuralNetwork{
	constructor(neuronCounts){
		this.levels=[];

		for(let i=0; i<neuronCounts.length-1; i++){
			this.levels.push(new Level(
				neuronCounts[i], neuronCounts[i+1]
			));
		}
	}

	static feedForward(givenInputs, network){
		let outputs = Level.feedForward(
			givenInputs, network.levels[0]
		);

		for(let i=1; i<network.levels.length; i++){
			outputs = Level.feedForward(
				outputs, network.levels[i]
			);
		}

		return outputs;
	}
}

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
			let sum =0;
			for(let i=0; i<level.inputs.length; i++){
				sum += level.weights[i][j] * level.inputs[i];
			}

			if(sum>level.biases[j]){
				level.outputs[j] = 1;
			} else {
				level.outputs[j] = 0;
			}
		}

		return level.outputs;
	}
}