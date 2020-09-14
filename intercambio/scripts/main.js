const botonTotal = {
	
	data: function () {
	    return {
	      Name: 'TOTAL',
		  protein: 0,
		  Grasas_T: 0,
		  Grasas_S: 0,
		  Grasas_M: 0,
		  Grasas_P: 0,
		  Colesterol: 0,
		  CHO: 0,
		  Na: 0,
		  Fibra: [0,0],
		  hidde: false,
	    }
	 },
	props:['teams'],
	
	methods:{
		show(){
			if(!this.hidde){
				this.hidde = true;
			} 
		},
		hidding(){
			if(this.hidde){
				this.hidde = false;
			} 
		},
		reseteador(){
		 	this.protein = 0;
		 	this.Grasas_T = 0;
		 	this.Grasas_S = 0;
		 	this.Grasas_M = 0;
		 	this.Grasas_P = 0;
		 	this.Colesterol = 0;
		 	this.CHO = 0;
		 	this.Na = 0;
		 	this.Fibra = [0,0];
		},

		sumador(){
			this.reseteador();
			this.show();
			for (let element of this.teams){
				for (const prop in element ) {
	    			if( prop == 'protein'){
	    				this.protein += element[prop];
	    			} else if( prop == 'Grasas_T'){
	    				this.Grasas_T += element[prop];
	    				this.Grasas_T=parseFloat(this.Grasas_T.toFixed(2));
	    			} else if( prop == 'Grasas_S'){
	    				this.Grasas_S += element[prop];
	    				this.Grasas_S=parseFloat(this.Grasas_S.toFixed(2));
	    			} else if( prop == 'Grasas_M'){
	    				this.Grasas_M += element[prop];
	    				this.Grasas_M=parseFloat(this.Grasas_M.toFixed(2));
	    			} else if( prop == 'Grasas_P'){
	    				this.Grasas_P += element[prop];
	    				this.Grasas_P=parseFloat(this.Grasas_P.toFixed(2));
	    			} else if( prop == 'Colesterol'){
	    				if(isNaN(element[prop])){
	   						let aux= parseFloat(element[prop].substr(-1));
	   						this.Colesterol += aux;
	    				} else{
		    				this.Colesterol += element[prop];
	    				}
	    			}  else if( prop == 'CHO'){
	    				this.CHO += element[prop];
	    			} else if( prop == 'Na'){
	    				if(isNaN(element[prop])){
	    					if(element[prop] !== 'tr'){
	    						let aux= parseFloat(element[prop].substr(-1));
	   							this.Na += aux;
	    					}
	    				} else{
		    				this.Na += element[prop];
	    				}
	    			} else if( prop == 'Fibra'){
	    				if(isNaN(element[prop])){
	    					this.Fibra[0] += element[prop][0];
							this.Fibra[1] += element[prop][1];
	    				}
	    			}
	    		}
	    	}	
    		
    	},
	},

	template:
	`<article v-on:click="sumador()" v-on:mouseleave = 'hidding()' >
		<span  class="totalname"> {{ Name }} </span>
		<transition  name="slide-fade">
		<ul v-if='hidde' class="resultados">
			<li> {{ protein }} </li>
			<li> {{ Grasas_T }} </li>
			<li> {{ Grasas_S }} </li>
			<li> {{ Grasas_M }} </li>
			<li> {{ Grasas_P }} </li>
			<li> {{ Colesterol }} </li>
			<li> {{ CHO }} </li>
			<li> {{ Na }} </li>
			<li> {{ Fibra }} </li>
		</ul>
        </transition>
	</article>
		`,

	
};





new Vue({
	el:'#app',
	data:{
		titulos:{ Name: 'Grupo de alimentos',
				protein: 'Proteinas',
		 		Grasas_T: 'Grasas T',
		 		Grasas_S: 'Grasas S',
		 		Grasas_M: 'Grasas M',
		 		Grasas_P:  'Grasas P',
		 		Colesterol: 'Colesterol',
		 		CHO: 'CHO',
		 		Na: 'NA',
				Fibra: 'Fibra',
				Unidad: 'Numero de intercambio',
				},

		teams: Seed.Teams,

   	 	dTeams: JSON.parse(JSON.stringify( Seed.Teams )),

		dTotales: Object.assign({}, this.totales),

	},
		
	computed:{

    },
    methods:{
    	
    	resetTeam(id){
    		
    		const originalTeam = this.Encontrar(id);
    		
    	  	let modificadoTeam = this.Encontrar(id,'T');
    	  	
    	    
       		for (const prop in originalTeam ) {
       			let copiaSeguraValor =  JSON.parse(JSON.stringify( originalTeam[prop]));
       			modificadoTeam[prop]= copiaSeguraValor
       		}
    	},

    	resetTeams(){
    		for( let id=0; id<18;id++){
	    		const originalTeam = this.Encontrar(id);
	    		let modificadoTeam = this.Encontrar(id,'T');
	    	  	    
	       		for (const prop in originalTeam ) {
	       			let copiaSeguraValor =  JSON.parse(JSON.stringify( originalTeam[prop]));
	       			modificadoTeam[prop]= copiaSeguraValor
	       		}
	       	}
    	},
    	
    	Encontrar(teamId,val){
    		if(val == 'T'){
    			const team = this.teams.find(team => team.id === teamId);
    			return team;
    		} else{
    			const dteam = this.dTeams.find(	dteam => dteam.id === teamId);
    			return dteam;
    		}
    	},

    	Multi(id,value){
    		this.resetTeam(id);

    		value = parseInt(value);
    		if (isNaN(value) ){
    			value = 1;
    		}

    		const team = this.Encontrar(id,'T');

    		for (const prop in team ) {
    			if(isNaN(team[prop]) ){
    				if(prop == 'Colesterol' || prop == 'Na'){
    					if(team[prop] != 'tr'){
    						let aux= parseFloat(team[prop].substr(-1));
			     			aux *= value;
  					   		aux=parseFloat(aux.toFixed(2));
			     			team[prop]=team[prop].replace(team[prop].substr(-1), aux);
    					}		
    				} else if ( prop == 'Fibra'){
    					team[prop][0] *= value;
    					team[prop][1] *= value;
    				} 
    			} else{
    				if( prop != 'id'){
    					team[prop]*=value;
			   			team[prop]=parseFloat(team[prop].toFixed(2));

    				}
    			}
    			    			
    		}

    	},

    },
    components: {
    	'boton-total' : botonTotal
    },
  
});