const should = require('should');

const objectQuery = require('../');

describe('objectQuery multi-query', function () {

	beforeEach(function () {
		var locations = this.locations = [];

		var brasil,
			sp, mg,
			saopaulo, campinas, belohorizonte, ouropreto,
			saude, butanta, belavista, savassi;

		brasil = this.brasil = {
			name: 'Brasil',
			type: 'country',
			population: 201032714,
		};

		// states
		sp = this.sp = {
			name: 'Sao Paulo',
			type: 'state',
			country: brasil,
			population: 41901219,
			dishes: ['virado', 'cafe']
		};

		mg = this.mg = {
			name: 'Minas Gerais',
			type: 'state',
			country: brasil,
			population: 19855332,
			dishes: ['tutu', 'feijao tropeiro', 'feijoada', 'queijo']
		};



		// districts
		saude = this.saude = {
			name: 'Saude',
			type: 'district',
		};

		butanta = this.butanta = {
			name: 'Butanta',
			type: 'district',
		};

		belavista = this.belavista = {
			name: 'Bela Vista',
			type: 'district',
		};

		savassi = this.savassi = {
			name: 'Savassi',
			type: 'district'
		};


		// cities
		saopaulo = this.saopaulo = {
			name: 'Sao Paulo',
			type: 'city',
			state: sp,
			population: 11316149,
			districts: [saude, butanta, belavista]
		};


		campinas = this.campinas = {
			name: 'Campinas',
			type: 'city',
			state: sp,
			population: 1098630
		};

		belohorizonte = this.belohorizonte = {
			name: 'Belo Horizonte',
			type: 'city',
			state: mg,
			population: 2479175,
			districts: [savassi]
		};

		ouropreto = this.ouropreto = {
			name: 'Ouro Preto',
			type: 'city',
			state: mg,
			population: 70227
		}

		locations.push(brasil);

		locations.push(mg);
		locations.push(belohorizonte);
		locations.push(ouropreto);

		locations.push(sp);
		locations.push(saopaulo);
		locations.push(campinas);


	});
});
