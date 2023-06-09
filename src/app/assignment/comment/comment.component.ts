import { Component, OnInit } from '@angular/core';
import CustomPoint from '../customPoint';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

    commentList: any = []
    name: string = '';
    comment: string = '';
    uuid: any = null;

    ngOnInit(): void { }

    onSubmit(comment: any) {
        if (this.uuid != null) {
            this.commentList.map((comment: any) => {
                if (comment.uuid == this.uuid) {
                    comment.name = this.name;
                    comment.comment = this.comment;
                }
            });
        } else {
            comment.timeStamp = new Date();
            comment.timeStamp.toLocaleString();
            comment.uuid = uuidv4();
            this.commentList.push(comment);
        }
        console.log(this.commentList);
        this.uuid = null;
        this.name = '';
        this.comment = '';
    }

    editComment(comment: any) {
        this.name = comment.name;
        this.comment = comment.comment;
        this.uuid = comment.uuid;
    }

    OnDelete(uuid: any) {
        this.commentList = this.commentList.filter((comment: any) => comment.uuid != uuid);
    }

    // Custom Point Emmiter
    onSubmitCustompoint(customPoint: CustomPoint) {
        console.log(customPoint);
    }
}
