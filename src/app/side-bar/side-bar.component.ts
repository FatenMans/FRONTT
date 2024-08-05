import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  ngOnInit(): void {
    this.getRole()
  }

  //recupere roleUlt

  role: string = ""
  toggleFormateur() {

    let list = document.getElementById("Formateur")
    if (list!.style.display === "none") {
      console.log("faten")
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }


  toggleFormations() {
    let list = document.getElementById("Formation")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }


  toggleCabinet() {
    let list = document.getElementById("Cabinet")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }

  toggleTheme() {
    let list = document.getElementById("Theme")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  toggleParticipant() {
    let list = document.getElementById("Participant")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  toggleLieu() {
    let list = document.getElementById("Lieu")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  toggleLieuHebergement() {
    let list = document.getElementById("LieuHebergement")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  togglePlanFormation() {
    let list = document.getElementById("Plan formation")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  toggleEval() {
    let list = document.getElementById("Eval")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  toggleDemande() {
    let list = document.getElementById("Demande")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
  getRole() {
    this.role = JSON.parse(localStorage.getItem("roles")!)
    console.log(this.role)

  }
  toggleEnrolle() {
    let list = document.getElementById("Enrolle")
    if (list!.style.display === "none") {
      list!.style.display = "block";
    } else {
      list!.style.display = "none";
    }
  }
}
