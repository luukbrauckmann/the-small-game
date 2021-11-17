import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
	id = this.activatedRoute.snapshot.paramMap.get('id');

	get item() { return this.service.item; }

  constructor(
		private service: UsersService,
		private activatedRoute: ActivatedRoute
	) {	}

  ngOnInit(): void {
		this.getItem();
  }

	ngOnDestroy(): void {
		this.service.breadcrumbs = undefined;
	}

	getItem() {
		if (this.id) this.service.getItem(this.id);
	}

}
