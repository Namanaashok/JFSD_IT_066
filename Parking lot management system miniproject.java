import java.util.*;

interface ParkingOperations{ boolean parkVehicle(String vechileNumber); 
boolean removeVehicle(String vehicleNumber);
void viewParkedVehicles(); 
boolean checkAvailability(); }

abstract class ParkingSpot{ protected int spotID;
protected boolean isOccupied; 
protected String vehicleDetails;

public ParkingSpot(int spotID){
        this.spotID=spotID;
        this.isOccupied = false;
        this.vehicleDetails="";
    }
    public int getspotID(){
        return spotID;
    }
    public boolean isOccupied(){
        return isOccupied;
    }
    public String getvehicleDetails(){
        return vehicleDetails;
    }
}
class ParkingLot implements ParkingOperations {
 
    private static final int totalparkingspots=10; 
    private final Map<Integer, ParkingSpot> spots;

    public ParkingLot() {
    spots = new HashMap<>();
    for (int i = 1; i <= totalparkingspots; i++) {
    spots.put(i, new ParkingSpot(i) {});
        }
    }

    @Override
public boolean parkVehicle(String vehicleNumber) {
    for (ParkingSpot spotID : spots.values()) {
        if (!spotID.isOccupied) {
            spotID.isOccupied = true;
            spotID.vehicleDetails = vehicleNumber;
        System.out.println("Vehicle " + vehicleNumber + " parked at Spot " + spotID.getspotID());
        return true;
    }
}
System.out.println("No available parking spots");
return false;

} @Override public boolean removeVehicle(String vehicleNumber) { for (ParkingSpot spotID : spots.values()) { if (spotID.isOccupied && spotID.getvehicleDetails().equals(vehicleNumber)) { spotID.isOccupied = false; spotID.vehicleDetails = ""; System.out.println("Vehicle " + vehicleNumber + " has left from Spot " + spotID.getspotID()); return true; } } System.out.println("Vehicle not found"); return false; } @Override public void viewParkedVehicles() { boolean empty = true; System.out.println("\nParked Vehicles:"); for (ParkingSpot spotID : spots.values()) { if (spotID.isOccupied) { System.out.println(" Spot " + spotID.getspotID() + " - Vehicle: " + spotID.getvehicleDetails()); empty = false; } } if (empty) { System.out.println("No vehicles are parked."); } }

@Override
    public boolean checkAvailability() {
for (ParkingSpot spotID : spots.values()) {
    if (!spotID.isOccupied) {
        System.out.println("Available Spot: " + spotID.getspotID());
        return true;
    }
}
System.out.println("No spots available");
return false;

} }

public class ParkingLotManagementSystem 
{ 
    public static void Main(String[] args) 
    { 
    Scanner scanner = new Scanner(System.in); ParkingLot parkingLot = new ParkingLot();

while (true) {
        System.out.println("\nWelcome to the Parking Lot System");
        System.out.println("1.Park a Car");
        System.out.println("2.Remove a Car");
        System.out.println("3.View Parked Cars");
        System.out.println("4.Check Available Spots");
        System.out.println("5.Exit");
        System.out.print("Choose an option: ");

        int choice = scanner.nextInt();
        scanner.nextLine(); 

        switch (choice) {
            case 1 -> {
                System.out.print("Enter vehicle number to park: ");
                String vehicleNumber = scanner.nextLine();
                parkingLot.parkVehicle(vehicleNumber);
            }
            case 2 -> {
                System.out.print("Enter vehicle number to remove: ");
                String removeVehicle = scanner.nextLine();
                parkingLot.removeVehicle(removeVehicle);
            }
            case 3 -> parkingLot.viewParkedVehicles();
            case 4 -> parkingLot.checkAvailability();
            case 5 -> {
                System.out.println("Exiting the Parking Lot System.");
                scanner.close();
                return;
            }
            default -> System.out.println("Invalid choice! Please try again.");
        }
    }
}

}

