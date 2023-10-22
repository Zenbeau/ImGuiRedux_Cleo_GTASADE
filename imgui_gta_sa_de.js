/// <reference path=".config/sa.d.ts" />
import { ImGuiCol, KeyCode } from './.config/enums';
import { ImGuiCond, ImGuiStyleVar } from './.config/enums';
import vehicleList from "./data/vehicles.json";
import colorsList from "./data/colors.json";

var ShowMenu = true; 
// for checkbox text print
let oncehealth = true;
let onceWanted = true;
let onceAmmo = true;
let onceTired = true;
let onceBike = true;
// let onceSpeed = true;

var stayOnBike = false;
var health_flag = false;
var tired_flag = false;
// wanted level
var wanted_flag = false;
var selectedItem = 0;
var sliderWantedInit = 0; 
//var wantedLevels = [0, 1, 2, 3, 4, 5, 6]; // Make sure to use string values for display
var ammo_flag = false;
// vehicle/transport
// var speed_flag = false;
// var heading = false;
var current_vehicle = false;
var current_jetpk = false;
// weapons
var current_weapon = false;
const weaponList = "Unarmed, Brass Knuckles, Golf Club, Night Stick, Knife, Baseball Bat, Shovel, Pool Cue, Katana, Chainsaw, Grenade, Teargas, Molotov, Pistol, Silenced Pistol, Desert Eagle, Shotgun, Sawn-off Shotgun, Spas-12 Shotgun, Tec9, Micro Uzi, MP5, AK47, M4, Rifle, Sniper, Rocket Launcher, Rocket Launcher Hs, Flamethrower, Minigun, Satchel, Detonator, Spray Can, Extinguisher, Camera, Night Vision, Infrared, Parachute, Dildo1, Dildo2, Vibe1, Vibe2, Flowers, Cane, Rocket (missile), Rocket Hs (missile), Freefall Bomb (missile)";
const weaponArray = weaponList.split(', ');

var p = new Player(0);
var ca = new Car(0);
var c = new Char(0);
var pick = new Pickup(0);
 
    function loadModel(modelId) {
        Streaming.RequestModel(modelId);
        while (!Streaming.HasModelLoaded(modelId)) {
            wait(250);
        }
    }

    function GrantWeapon(selectedWeapon) {   
        switch (selectedWeapon) {
          case 0:  // Unarmed
            loadModel(-1);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(0, 1);  // giveWeapon, parameters: weapon ID, ammo
            break;
          case 1:  // Brass Knuckles
            loadModel(331);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(1, 1);
            Streaming.MarkModelAsNoLongerNeeded(331);
            break;
          case 2:  // Golf Club
            loadModel(333);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(2, 1);
            Streaming.MarkModelAsNoLongerNeeded(333);
            break;
          case 3:  // Night Stick
            loadModel(334);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(3, 1);
            Streaming.MarkModelAsNoLongerNeeded(334);
            break;
          case 4:  // Knife
            loadModel(335);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(4, 1);
            Streaming.MarkModelAsNoLongerNeeded(335);
            break;
          case 5:  // Baseball Bat
            loadModel(336);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(5, 1);
            Streaming.MarkModelAsNoLongerNeeded(336);
            break;
          case 6:  // Shovel
            loadModel(337);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(6, 1);
            Streaming.MarkModelAsNoLongerNeeded(337);
            break;
          case 7:  // Pool Cue
            loadModel(338);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(7, 1);
            Streaming.MarkModelAsNoLongerNeeded(338);
            break;
          case 8:  // Katana
            loadModel(339);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(8, 1);
            Streaming.MarkModelAsNoLongerNeeded(339);
            break;
          case 9:  // Chainsaw
            loadModel(341);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(9, 1);
            Streaming.MarkModelAsNoLongerNeeded(341);
            break;
          case 10:  // Grenade
            loadModel(342);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(16, 10);
            Streaming.MarkModelAsNoLongerNeeded(342);
            break;
          case 11:  // Teargas
            loadModel(343);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(17, 10);
            Streaming.MarkModelAsNoLongerNeeded(343);
            break;
          case 12:  // Molotov
            loadModel(344);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(18, 10);
            Streaming.MarkModelAsNoLongerNeeded(344);
            break;
          case 13:  // Pistol
            loadModel(346);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(22, 100);
            Streaming.MarkModelAsNoLongerNeeded(346);
            break;
          case 14:  // Pistol Silenced
            loadModel(347);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(23, 40);
            Streaming.MarkModelAsNoLongerNeeded(347);
            break;
          case 15:  // Desert Eagle
            loadModel(348);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(24, 40);
            Streaming.MarkModelAsNoLongerNeeded(348);
            break;
          case 16:  // Shotgun
            loadModel(349);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(25, 50);
            Streaming.MarkModelAsNoLongerNeeded(349);
            break;
          case 17:  // Sawnoff
            loadModel(350);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(26, 40);
            Streaming.MarkModelAsNoLongerNeeded(350);
            break;
          case 18:  // Spas-12
            loadModel(351);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(27, 30);
            Streaming.MarkModelAsNoLongerNeeded(351);
            break;
          case 19:  // Tec9
            loadModel(372);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(32, 150);
            Streaming.MarkModelAsNoLongerNeeded(372);
            break;
          case 20:  // Micro Uzi
            loadModel(352);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(28, 150);
            Streaming.MarkModelAsNoLongerNeeded(352);
            break;
          case 21:  // Mp5
            loadModel(353);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(29, 100);
            Streaming.MarkModelAsNoLongerNeeded(353);
            break;
          case 22:  // Ak47
            loadModel(355);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(30, 120);
            Streaming.MarkModelAsNoLongerNeeded(355);
            break;
          case 23:  // M4
            loadModel(356);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(31, 150);
            Streaming.MarkModelAsNoLongerNeeded(356);
            break;
          case 24:  // Rifle
            loadModel(357);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(33, 25);
            Streaming.MarkModelAsNoLongerNeeded(357);
            break;
          case 25:  // Sniper
            loadModel(358);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(34, 21);
            Streaming.MarkModelAsNoLongerNeeded(358);
            break;
          case 26:  // Rocket Launcher
            loadModel(359);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(35, 200);
            Streaming.MarkModelAsNoLongerNeeded(359);
            break;
          case 27:  // Rocket Launcher Hs
            loadModel(360);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(36, 200);
            Streaming.MarkModelAsNoLongerNeeded(360);
            break;
          case 28:  // Flamethrower
            loadModel(361);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(37, 500);
            Streaming.MarkModelAsNoLongerNeeded(361);
            break;
          case 29:  // Minigun
            loadModel(362);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(38, 500);
            Streaming.MarkModelAsNoLongerNeeded(362);
            break;
          case 30:  // Satchel
            loadModel(363);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(39, 5);
            Streaming.MarkModelAsNoLongerNeeded(363);
            break;
          case 31:  // Detonator
            loadModel(364);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(40, 1);
            Streaming.MarkModelAsNoLongerNeeded(364);
            break;
          case 32:  // Spray Can
            loadModel(365);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(41, 200);
            Streaming.MarkModelAsNoLongerNeeded(365);
            break;
          case 33:  // Extinguisher
            loadModel(366);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(42, 200);
            Streaming.MarkModelAsNoLongerNeeded(366);
            break;
          case 34:  // Camera
            loadModel(367);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(43, 200);
            Streaming.MarkModelAsNoLongerNeeded(367);
            break;
          case 35:  // Night Vision
            loadModel(368);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(44, 1);
            Streaming.MarkModelAsNoLongerNeeded(368);
            break;
          case 36:  // Infrared
            loadModel(369);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(45, 1);
            Streaming.MarkModelAsNoLongerNeeded(369);
            break;
          case 37:  // Parachute
            loadModel(371);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(46, 1);
            Streaming.MarkModelAsNoLongerNeeded(371);
            break;
          case 38:  // Dildo1
            loadModel(321);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(10, 1);
            Streaming.MarkModelAsNoLongerNeeded(321);
            break;
          case 39:  // Dildo2
            loadModel(322);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(11, 1);
            Streaming.MarkModelAsNoLongerNeeded(322);
            break;
          case 40:  // Vibe1
            loadModel(323);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(12, 1);
            Streaming.MarkModelAsNoLongerNeeded(323);
            break;
          case 41:  // Vibe2
            loadModel(324);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(13, 1);
            Streaming.MarkModelAsNoLongerNeeded(324);
            break;
          case 42:  // Flowers
            loadModel(325);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(14, 1);
            Streaming.MarkModelAsNoLongerNeeded(325);
            break;
          case 43:  // Cane
            loadModel(326);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(15, 1);
            Streaming.MarkModelAsNoLongerNeeded(326);
            break;
          case 44:  // Rocket
            loadModel(345);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(19, 1);
            Streaming.MarkModelAsNoLongerNeeded(345);
            break;
          case 45:  // Rocket Hs
            loadModel(345);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(20, 1);
            Streaming.MarkModelAsNoLongerNeeded(345);
            break;
          case 46:  // Freefall Bomb
            loadModel(345);
            Streaming.LoadAllModelsNow();
            current_weapon = p.getChar().giveWeapon(21, 1);
            Streaming.MarkModelAsNoLongerNeeded(345);
            break;
          default:
            break;            
        }
    }

    function WeaponSet1() {
        loadModel(336);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(5, 1);  // Baseball Bat
        Streaming.MarkModelAsNoLongerNeeded(336);

        loadModel(344);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(18, 10);  // Molotovs
        Streaming.MarkModelAsNoLongerNeeded(344);
        
        loadModel(346);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(22, 100);  // Pistol
        Streaming.MarkModelAsNoLongerNeeded(346);
        
        loadModel(352);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(28, 150);  // Micro-Uzi
        Streaming.MarkModelAsNoLongerNeeded(352);

        loadModel(349);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(25, 50);  // Shotgun
        Streaming.MarkModelAsNoLongerNeeded(349);

        loadModel(355);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(30, 120);  // AK-47
        Streaming.MarkModelAsNoLongerNeeded(355);

        loadModel(357);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(33, 25);  // Rifle
        Streaming.MarkModelAsNoLongerNeeded(357);
        
        loadModel(359);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(35, 200);  // Rocket Launcher
        Streaming.MarkModelAsNoLongerNeeded(359);

        loadModel(365);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(41, 200);  // Spray Can
        Streaming.MarkModelAsNoLongerNeeded(365);
        
        loadModel(331);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(1, 1);  // Brass Knuckles
        Streaming.MarkModelAsNoLongerNeeded(331);
    }
    
    function WeaponSet2() {
        loadModel(335);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(4, 1);  // Knife
        Streaming.MarkModelAsNoLongerNeeded(335);       

        loadModel(342);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(16, 10);  // Grenade
        Streaming.MarkModelAsNoLongerNeeded(342);    

        loadModel(348);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(24, 40);  // Desert Eagle
        Streaming.MarkModelAsNoLongerNeeded(348);        

        loadModel(372);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(32, 150);  // Tec9
        Streaming.MarkModelAsNoLongerNeeded(372);        

        loadModel(350);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(26, 40);  // Sawn-off
        Streaming.MarkModelAsNoLongerNeeded(350);        

        loadModel(356);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(31, 150);  // M4
        Streaming.MarkModelAsNoLongerNeeded(356);        

        loadModel(358);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(34, 21);  // Sniper
        Streaming.MarkModelAsNoLongerNeeded(358);        

        loadModel(361);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(37, 500);  // Flamethrower
        Streaming.MarkModelAsNoLongerNeeded(361);        

        loadModel(366);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(42, 200);  // Fire Extinguisher
        Streaming.MarkModelAsNoLongerNeeded(366);    
        
        loadModel(-1);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(0, 1);  // Unarmed
    }
    
    function WeaponSet3() {
        loadModel(341);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(9, 1);  // Chainsaw
        Streaming.MarkModelAsNoLongerNeeded(341);        

        loadModel(363);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(39, 5);  // Satches
        Streaming.MarkModelAsNoLongerNeeded(363);        

        loadModel(347);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(23, 40);  // Silenced Pistol
        Streaming.MarkModelAsNoLongerNeeded(347);        

        loadModel(353);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(29, 100);  // MP5
        Streaming.MarkModelAsNoLongerNeeded(353);        

        loadModel(351);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(27, 30);  // Spas-12 shotgun
        Streaming.MarkModelAsNoLongerNeeded(351);        

        loadModel(356);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(31, 150);  // M4
        Streaming.MarkModelAsNoLongerNeeded(356);        

        loadModel(360);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(36, 200);  // HS Rocket Launcher
        Streaming.MarkModelAsNoLongerNeeded(360);        

        loadModel(-1);
        Streaming.LoadAllModelsNow();
        current_weapon = p.getChar().giveWeapon(0, 1);  // Unarmed
    }

    function InfiniteAmmo() {
        p.getChar().setAmmo(23, 9000);  // silenced pistol (handguns)
        p.getChar().setAmmo(27, 9000);  // spas-12 (shotguns)
        p.getChar().setAmmo(29, 9000);  // mp5 (SMGs)
        p.getChar().setAmmo(31, 9000);  // m4 (assault rifles)
        p.getChar().setAmmo(34, 9000);  // sniper rifle (rifles)
        p.getChar().setAmmo(36, 9000);  // rocket launcher hs (heavy weapons)
        p.getChar().setAmmo(39, 9000);  // satchels (throwables)
        p.getChar().setAmmo(41, 9000);  // spray can (handheld items)
    }

    function CreateVehicle(modelID) {   
        loadModel(modelID);
        current_vehicle = Car.Create(modelID, pos.x, pos.y, pos.z);
        current_vehicle.lockDoors(0);
        current_vehicle.markAsNoLongerNeeded();
        Streaming.MarkModelAsNoLongerNeeded(modelID); 
    } 

    function ChangeVehicleColor(colorID) {
        loadModel(colorID);
        if (current_vehicle) {
            current_vehicle.changeColor(colorID,colorID);
        }
    } 

    function SetWanted(stars) {
        p.alterWantedLevel(stars);
    }

//showTextBox("This is a test message!"); 
//Text.PrintHelp("MyText");
//Text.PrintBig("Styled1", 5000, 1); 
//Text.PrintBigQ("Styled1", 5000, 1);

while (true) {
    wait(0)  //This must always be 0 to render ImGui each frame

    ImGui.BeginFrame("ImGui_Menu");
    ImGui.SetCursorVisible(ShowMenu);
    
    if (ShowMenu) {
        ImGui.SetNextWindowSize(900, 1200, ImGuiCond.FirstUseEver);
        ImGui.Begin("Grand Theft Auto: San Andreas - The Definitive Edition", ShowMenu, 0, 0, 0, 0);
       
        let tab = ImGui.Tabs("TabBar", "Main,Weapon,Vehicle/Transport,Credits")
        
        if (tab == 0) {  // Main tab

            if (ImGui.Checkbox("Infinite Health", health_flag)) {
                health_flag = true;
                if (health_flag) {
                    if (oncehealth) {
                        showTextBox("Infinite Health on");
                        oncehealth = false;
                    }
                }
            } else if (health_flag == true) {
                health_flag = false;
                oncehealth = true;
                if (!health_flag) {
                    if (oncehealth) {
                        showTextBox("Infinite Health off");
                        oncehealth = false;
                    } 
                }
                oncehealth = true;
            } else {
                oncehealth = true;
            }

            if (ImGui.Button("Add Armor")) {
                    showTextBox("Armor added");
                    p.getChar().addArmor(150)
                }

            if (ImGui.Checkbox("Never Get Tired", tired_flag)) {
              tired_flag = true;
              if (tired_flag) {
                  if (onceTired) {
                      showTextBox("Never Get Tired on");
                      onceTired = false;
                  }
              }
          } else if (tired_flag == true) {
              tired_flag = false;
              onceTired = true;
              if (!tired_flag) {
                  if (onceTired) {
                      showTextBox("Never Get Tired off");
                      onceTired = false;
                  } 
              }
              onceTired = true;
          } else {
              onceTired = true;
          }

            if (ImGui.Checkbox("Freeze Wanted Level", wanted_flag)) {
                wanted_flag = true;
                if (wanted_flag) {
                    if (onceWanted) {
                        showTextBox("Freeze Wanted Level on");
                        onceWanted = false;
                    }
                }
            } else if (wanted_flag == true) {
                wanted_flag = false;
                onceWanted = true;
                if (!wanted_flag) {
                    if (onceWanted) {
                        showTextBox("Freeze Wanted Level off");
                        onceWanted = false;
                    } 
                }
                onceWanted = true;
            } else {
                onceWanted = true;
            }
            //ImGui.SameLine();
            ImGui.PushItemWidth(400.0);
            selectedItem = ImGui.SliderInt("Wanted Level", sliderWantedInit, 0, 6);
            ImGui.PopItemWidth();
            if (selectedItem != sliderWantedInit) {
                sliderWantedInit = selectedItem; // Update the wanted level
                SetWanted(sliderWantedInit); 
            } 
            // selectedItem = ImGui.ComboBox("Wanted_Level", "0,1,2,3,4,5,6", selectedItem);
            // if (selectedItem >= 0) {
            //     let str = "Selection: " + wantedLevels[selectedItem];
            //     SetWanted(wantedLevels[selectedItem]); 
            // }
            
            if (ImGui.CollapsingHeader("Money")) {
                if (ImGui.Button("Add $25,000")) {
                    showTextBox("Money added");
                    p.addScore(25000);
                }
                if (ImGui.Button("Add $250,000")) {
                    showTextBox("Money added");
                    p.addScore(250000);
                }
                if (ImGui.Button("Subtract $25,000")) {
                    showTextBox("Money subtracted");
                    p.addScore(-25000);
                }                
                if (ImGui.Button("Subtract $250,000")) {
                    showTextBox("Money subtracted");
                    p.addScore(-250000);
                }       
            }
        }

        if (tab == 1) {  // Weapon tab

            if (ImGui.Button("Weapon Set 1")) {
                showTextBox("Weapon Set 1");
                WeaponSet1();
            }
            ImGui.SameLine();
            if (ImGui.Button("Weapon Set 2")) {
                showTextBox("Weapon Set 2");
                WeaponSet2();
            }
            ImGui.SameLine();
            if (ImGui.Button("Weapon Set 3")) {
                showTextBox("Weapon Set 3");
                WeaponSet3();
            }
            
            if (ImGui.Checkbox("Infinite Ammo", ammo_flag)) {
                ammo_flag = true;
                if (ammo_flag) {
                    if (onceAmmo) {
                        showTextBox("Infinite Ammo on");
                        onceAmmo = false;
                    }
                } 
            } else if (ammo_flag == true) {
                ammo_flag = false;
                onceAmmo = true;
                if (!ammo_flag) {
                    if (onceAmmo) {
                        showTextBox("Infinite Ammo off");
                        onceAmmo = false;
                    } 
                }
                onceAmmo = true;
            } else {
                onceAmmo = true;
            }
            
            ImGui.SameLine();
            if (ImGui.Button("Remove All Weapons")) {
                showTextBox("All Weapons Removed");
                p.getChar().removeAllWeapons();
            }
            ImGui.NewLine();

            if (ImGui.CollapsingHeader("Give Weapon")) {
                let text = ImGui.InputText("Search weapon");
                // Loop through the weaponArray to display the selectable weapon names
                for (let i = 0; i < weaponArray.length; i++) {
                    if (weaponArray[i].toLowerCase().includes(text.toLowerCase())) {
                        if (ImGui.Selectable(weaponArray[i])) {
                            showTextBox("Weapon added");
                            GrantWeapon(i); // Call GrantWeapon with the corresponding index
                        }
                    }
                }
            }
        }

        if (tab == 2) {  // Vehicle/Transport tab

            // if (ImGui.Checkbox("Super Speed", speed_flag)) {
            //     speed_flag = true;
            //     if (speed_flag) {
            //         if (onceSpeed) {
            //             showTextBox("Super Speed on");
            //             onceSpeed = false;
            //         }
            //     }
            // } else if (speed_flag == true) {
            //     speed_flag = false;
            //     onceSpeed = true;
            //     if (!speed_flag) {
            //         if (onceSpeed) {
            //             showTextBox("Super Speed off");
            //             onceSpeed = false;
            //         } 
            //     }
            //     onceSpeed = true;
            // } else {
            //     onceSpeed = true;
            // }

            if (ImGui.Button("Warp to")) {
                if (current_vehicle != false) {
                    showTextBox("Warped");
                    p.getChar().warpIntoCar(current_vehicle);
                }
            }
            ImGui.SameLine()
            if (ImGui.Button("Repair")) {
                if (current_vehicle != false) {
                    if (p.getChar().isSittingInCar(current_vehicle)) {
                        showTextBox("Vehicle Repaired");
                        current_vehicle.fix();
                    }
                }
            }
            ImGui.SameLine()
            if (ImGui.Button("Delete")) {
                if (current_vehicle != false) {
                    if (!p.getChar().isSittingInCar(current_vehicle)) {
                        showTextBox("Vehicle Deleted");
                        current_vehicle.delete();
                        current_vehicle = false;
                    }
                }
            }
            ImGui.SameLine()
            if (ImGui.Button("Spawn Jetpack")) {
              showTextBox("Jetpack spawned");
              var pos = p.getChar().getOffsetInWorldCoords(0, 8, 1); // spawn 8 meters in front of the player
              Pickup.Create(370, 4, pos.x, pos.y, pos.z)
            }
            // ImGui.SameLine();
            // if (ImGui.Button("Remove Jetpack")) {
            //   current_jetpk.remove();
            //   //showTextBox("Jetpack removed");
            // }
            
            if (ImGui.Checkbox("Always On Bike", stayOnBike)) {
              stayOnBike = true;
              if (stayOnBike) {
                  if (onceBike) {
                      showTextBox("Always On Bike on");
                      onceBike = false;
                  }
              }              
            } else if (stayOnBike == true) {
              stayOnBike = false;
              onceBike = true;
              if (!stayOnBike) {
                  if (onceBike) {
                      showTextBox("Always On Bike off");
                      onceBike = false;
                  } 
              }
              onceBike = true;
          } else {
              onceBike = true;
          }

            ImGui.NewLine();
            
            if (ImGui.CollapsingHeader("Color Changer")) {
                let text = ImGui.InputText("Search color");
                // Display the color names as text labels
                for (let key in colorsList) {
                    if (key.toLowerCase().includes(text.toLowerCase())) {
                        if (ImGui.Selectable(key, false)) {
                            let color = colorsList[key];
                            showTextBox("Vehicle Color changed");
                            ChangeVehicleColor(color);
                        } 
                    }
                }
            }
            ImGui.NewLine();

            if (ImGui.CollapsingHeader("Vehicle Spawner")) {
                let text = ImGui.InputText("Search vehicle");
                // Display full vehicle names as text labels
                for (let key in vehicleList) {
                    if (key.toLowerCase().includes(text.toLowerCase())) {
                        if (ImGui.Selectable(key, false)) {
                            let model = vehicleList[key];
                            var pos = p.getChar().getOffsetInWorldCoords(0, 8, 1); // spawn 8 meters in front of the player
                            showTextBox("Vehicle Spawned");
                            CreateVehicle(model);
                        }
                    }
                }
            }
        }

        if (tab == 3) {  // Credits tab
          ImGui.Text("Made by Zenbeau.");
          ImGui.NewLine();
          ImGui.Text("Thanks to PurpleWolfy/NightWolfy004 for the original source code\nfor Vehicle Spawner and Color Changer.")
          ImGui.Text("Thanks to Grinch and Seemann for making ImGuiRedux!\n(which is what was used to make this)")
          ImGui.Text("Also thanks to seifmagdi for his continuous support.");
        }

        ImGui.End();
    }
    ImGui.EndFrame();

    // if Insert key is pressed
    if (Pad.IsKeyPressed(KeyCode.Insert)) {
        while (Pad.IsKeyPressed(KeyCode.Insert)) {
            wait(0);
        }
        ShowMenu = !ShowMenu;
    }
 
    if (Pad.IsKeyPressed(KeyCode.F1)) {
        if (current_vehicle != false) {
            showTextBox("Warped");
            p.getChar().warpIntoCar(current_vehicle);  // warp into last vehicle spawned
        }
    }
    if (Pad.IsKeyPressed(KeyCode.F2)) {
        if (current_vehicle != false) {
            if (p.getChar().isSittingInCar(current_vehicle)) {
                showTextBox("Vehicle Repaired");
                current_vehicle.fix();  // repairs last vehicle spawned. need to be sitting in vehicle or it won't work
            }
        }
    }
    if (Pad.IsKeyPressed(KeyCode.F3)) {
        if (current_vehicle != false) {
            if (!p.getChar().isSittingInCar(current_vehicle)) {  // so current vehicle can't be deleted while sitting in it
                showTextBox("Vehicle Deleted");
                current_vehicle.delete();  // deletes last vehicle spawned
                current_vehicle = false;
            }
        }
    }
    
    if (stayOnBike) {
      p.getChar().setCanBeKnockedOffBike(true);
    } else { 
      p.getChar().setCanBeKnockedOffBike(false);
    }
    
    if (health_flag) {
        p.getChar().setHealth(176);
    }

    if (tired_flag) {
        p.setNeverGetsTired(true);
    } else {
        p.setNeverGetsTired(false);
    }

    if (wanted_flag) {
        SetWanted(sliderWantedInit);        
    }
    
    if (ammo_flag) {
        p.setFastReload(true)  // makes weapons like rifles & rocket launchers shoot faster
        InfiniteAmmo();
    } else {
        p.setFastReload(false)
    }

    // if (speed_flag) {
    //     heading = p.getChar().getHeading();
    //     Text.Print(`Heading: ${heading.toFixed(3)}\0`, 250, 13)
    // } 
}