from models import Vehicle, Car, Motorcycle

def main():
    # 1. Instantiate objects from each class
    generic_vehicle = Vehicle("Generic", "Transport", 2020)
    my_car = Car("Toyota", "Camry", 2023, 4)
    my_motorcycle = Motorcycle("Yamaha", "MT-07", 2022)

    # 2. Store objects in a list
    vehicles = [generic_vehicle, my_car, my_motorcycle]

    print("--- Vehicle Details ---")
    # Iterate and print string representations (`__str__` method)
    for v in vehicles:
        print(v)
    
    print("\n--- Testing Unique Methods ---")
    print(my_car.open_trunk())
    print(my_motorcycle.do_wheelie())

    print("\n--- Demonstrating Polymorphism (start_engine) ---")
    # 3. Call overridden methods (Polymorphism)
    for v in vehicles:
        # Each object calls its own version of start_engine()
        print(v.start_engine())

    print("\n--- Stopping Engines ---")
    for v in vehicles:
        print(v.stop_engine())

if __name__ == "__main__":
    main()
