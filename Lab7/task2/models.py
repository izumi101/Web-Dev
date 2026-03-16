class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.engine_running = False

    def start_engine(self):
        if not self.engine_running:
            self.engine_running = True
            return f"The {self.year} {self.brand} {self.model}'s engine is starting."
        return "The engine is already running."

    def stop_engine(self):
        if self.engine_running:
            self.engine_running = False
            return f"The {self.year} {self.brand} {self.model}'s engine is stopping."
        return "The engine is already off."

    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"


class Car(Vehicle):
    def __init__(self, brand, model, year, num_doors):
        super().__init__(brand, model, year)
        self.num_doors = num_doors

    def start_engine(self):
        # Override parent method
        base_message = super().start_engine()
        if "starting" in base_message:
            return f"{base_message} Vroom! Vroom!"
        return base_message

    def open_trunk(self):
        return f"Opening the trunk of the {self.brand} {self.model}."


class Motorcycle(Vehicle):
    def __init__(self, brand, model, year, has_sidecar=False):
        super().__init__(brand, model, year)
        self.has_sidecar = has_sidecar

    def start_engine(self):
        # Override parent method
        base_message = super().start_engine()
        if "starting" in base_message:
            return f"{base_message} Braap braap!"
        return base_message

    def do_wheelie(self):
        if self.has_sidecar:
            return f"The {self.brand} {self.model} can't do a wheelie with a sidecar!"
        return f"The {self.brand} {self.model} is doing a wheelie!"
