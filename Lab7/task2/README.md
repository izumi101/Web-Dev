# Lab 7: Object-Oriented Programming in Python (Task 2)

This project demonstrates core Object-Oriented Programming (OOP) concepts in Python, modeling a simple `Vehicle` hierarchy as required by the Task 2 guidelines.

## Structure
- `models.py`: Contains the class definitions (`Vehicle`, `Car`, `Motorcycle`).
- `main.py`: A script that imports the classes, creates objects, and demonstrates their usage visually.

## OOP Concepts Demonstrated
1. **Classes and Objects**: We created a base class `Vehicle` and instantiated objects from it and its subclasses.
2. **Inheritance**: `Car` and `Motorcycle` inherit from the `Vehicle` base class. They reuse attributes (`brand`, `model`, `year`) and methods (`stop_engine()`, `__str__()`).
3. **Encapsulation/Attributes**: Each class manages its own data attributes. Child classes introduce unique attributes like `num_doors` for `Car` and `has_sidecar` for `Motorcycle`, and all classes use the `__init__` constructor appropriately.
4. **Polymorphism and Method Overriding**: Both `Car` and `Motorcycle` override the `start_engine()` method from the `Vehicle` class to provide a custom implementation (adding specific engine sounds) while maintaining the same method signature as the parent class.
5. **String Representation**: The base `Vehicle` class implements the `__str__` method to provide a clean string representation, which is automatically inherited and used by the child classes when printed.

## Running the Code
To see the demonstration in action, run the following command in your terminal:
```bash
python main.py
```
