import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
import {log} from 'util';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  catName = '';
  taskList = [];

  constructor( public navCtrl:NavController,public alertCtrl: AlertController) {

    if (localStorage.getItem('category')){
      this.taskList = JSON.parse(localStorage.getItem('category'));
    }
  }

  addCat() {
    if (this.catName.length > 0) {
      let task = this.catName;
      this.taskList.push(task);
      localStorage.setItem('category', JSON.stringify(this.taskList)) ;
      this.catName = "";
    }else {
      alert('Please Enter Category Name');
    }
  }

  async deleteTask(index){

    const alert1 = await this.alertCtrl.create({
      message: 'Are you sure to delete category ?',
      buttons: [{ text: 'Cancel', role: 'cancel' },
        { text: 'Yes', handler: data => {
            this.taskList.splice(index, 1); }
        }
      ]
    });
    await alert1.present();
  }

  async updateCat(index) {
    const  alert = await this.alertCtrl.create({
      message: 'Type new category to update.',
      inputs: [{ name: 'editCat', placeholder: 'Enter Category' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
        { text: 'Update', handler: data => {
            this.taskList[index] = data.editCat; }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
