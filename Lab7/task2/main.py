from models import Vehicle, Car, Motorcycle

def main():
    generic_vehicle = Vehicle("Generic", "Transport", 2020)
    my_car = Car("Toyota", "Camry", 2023, 4)
    my_motorcycle = Motorcycle("Yamaha", "MT-07", 2022)

    vehicles = [generic_vehicle, my_car, my_motorcycle]

    print("--- Vehicle Details ---")
    for v in vehicles:
        print(v)
    
    print("\n--- Testing Unique Methods ---")
    print(my_car.open_trunk())
    print(my_motorcycle.do_wheelie())

    print("\n--- Demonstrating Polymorphism (start_engine) ---")
    for v in vehicles:
        print(v.start_engine())

    print("\n--- Stopping Engines ---")
    for v in vehicles:
        print(v.stop_engine())

if __name__ == "__main__":
    main()
