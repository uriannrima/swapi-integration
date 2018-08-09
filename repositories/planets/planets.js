class PlanetsReposity {

  constructor({ model }) {
    this.model = model;
  }

  async findById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async create(planet) {
    try {
      return await this.model.create(planet);
    } catch (error) {
      throw error;
    }
  }

  async list(filter) {
    try {
      return await this.model.list(filter);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.model.delete(id);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PlanetsReposity;