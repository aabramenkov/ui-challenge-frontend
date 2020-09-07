import { Component, OnInit } from '@angular/core';
import { TagService } from '../_services/tag.service';
import { Tag } from '../_models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  public tags: Tag[] = [];

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagService.getTags().subscribe(
      (res) => {
        this.tags = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
