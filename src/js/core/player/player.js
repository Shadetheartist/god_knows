function Player (pos)
{
	this.rect         = new Rectangle(0, 0, 10, 10, this);
	this.standardRect = new Rectangle(0, 0, 10, 10, this);

	this.accel           = new Point();
	this.maxSpeed        = 7.75;
	this.noCollide       = false;
	this.noCollideFrames = 0;

	this.bounciness   = 0.075;
	this.decel        = 0.70;
	this.airDecel     = 0.92;
	this.acceleration = 0.25;

	this.jumpStrength = 6.25;

	//amount of horizontal momentum is transferred into vertical
	this.jumpTransferAmount = 0.075;
	this.jumpDelay          = 5;
	this.jumpCooldown       = new CoolDown(20);

	//0 = not jumping, 1 = preparing, 2 = jumping
	this.jumpState = 0;
	this.jumpBoost = 0;

	this.touching = [];
	this.grounded = [];
}

Player.prototype.update = function(game)
{
	if (Keys.isPressed(Keys.left))
	{
		this.move(-1);
	}
	else if (Keys.isPressed(Keys.right))
	{
		this.move(1);
	}
	else
	{
		if (this.isInAir())
		{
			this.accel.x *= this.airDecel;
		}
		else
		{
			this.accel.x *= this.decel;
		}
	}

	if (Keys.isPressed(Keys.up))
	{
		this.beginJump(game);
	}

	//reduce effect of gravity when holding 'up' by a bit (while going up)
	if (Keys.isPressed(Keys.up) && this.accel.y < 0)
	{
		this.accel.y += game.env.gravity * 0.625;
	}
	else
	{
		this.accel.y += game.env.gravity;
	}

	this.rect.x += this.accel.x;
	this.rect.y += this.accel.y;

	this.touching.length = 0;
	this.grounded.length = 0;

	if (this.noCollideFrames === 0)
	{
		if (this.noCollide === false)
		{
			this.handleBoxCollisions(game);
			this.constrainToBounds(game.bounds);
		}
	}
	else
	{
		this.noCollideFrames--;
	}

};

Player.prototype.render = function(ctx)
{
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(
		this.rect.x,
		this.rect.y,
		this.rect.w,
		this.rect.h
	);
};

Player.prototype.beginJump = function(game)
{
	if (this.jumpCooldown.canTrigger(game.tick))
	{
		this.onPrepareJump();

		this.jumpState = 1;

		if (this.isInAir() === true)
		{
			return;
		}

		this.jumpCooldown.trigger(game.tick);

		this.rect.y += this.rect.h * 0.5;
		this.accel.x *= 0.5;

		this.rect.w *= 1.35;
		this.rect.h *= 0.65;

		game.setTickTimeout(function()
		{
			this.jumpState = 2;

			this.jump();

			this.rect.w = this.standardRect.w;
			this.rect.h = this.standardRect.h;

		}.bind(this), this.jumpDelay);
	}
};

Player.prototype.jump = function()
{
	this.onJump();

	var transfer = Math.abs(this.accel.x) * this.jumpTransferAmount;

	this.rect.y -= 1;
	this.accel.y -= this.jumpStrength + transfer;
	this.accel.x *= 1 - this.jumpTransferAmount;

};

Player.prototype.isInAir = function()
{
	return this.grounded.length === 0;
};

Player.prototype.move = function(horizontalDir)
{
	var mod = 1;

	if (this.isInAir() === true)
	{
		mod = 0.25;
		//make movement stronger when trying to turn around (weaker in air)
		if (Math.sign(horizontalDir) !== Math.sign(this.accel.x))
		{
			mod += 1;
		}
	}
	else if (this.jumpState === 1)
	{
		mod = 0.1;
	}
	else
	{
		//make movement stronger when trying to turn around
		if (Math.sign(horizontalDir) !== Math.sign(this.accel.x))
		{
			mod += 1.25;
		}
	}

	var accel = this.accel.x + this.acceleration * horizontalDir * mod;

	this.accel.x = Math.min(Math.abs(accel), this.maxSpeed) * Math.sign(accel);
};

Player.prototype.constrainToBounds = function(bounds)
{
	if (this.rect.x < bounds.x)
	{
		this.rect.x = bounds.x;
		this.accel.x *= -this.bounciness;
		this.touching.push(bounds);
	}
	else if (this.rect.x + this.rect.w > bounds.x + bounds.w)
	{
		this.rect.x = (bounds.x + bounds.w) - this.rect.w;
		this.accel.x *= -this.bounciness;
		this.touching.push(bounds);
	}

	if (this.rect.y < bounds.y)
	{
		this.rect.y = bounds.y;
		this.accel.y *= -this.bounciness;
		this.touching.push(bounds);
	}
	else if (this.rect.y + this.rect.h > bounds.y + bounds.h)
	{
		this.rect.y = (bounds.y + bounds.h) - this.rect.h;
		this.accel.y *= -this.bounciness;
		this.touching.push(bounds);
		this.grounded.push(bounds);
		this.onGrounded();

	}

};

Player.prototype.handleBoxCollisions = function(game)
{
	return game.quadtree.retrieve(this.rect, function(obj)
	{
		//dont collide with self
		if (obj.parent === this)
		{
			return;
		}

		var a = this.rect;
		var b = obj;

		if (this.rect.isCollide(b))
		{
			game.frontContext.strokeRect(b.x, b.y, b.w, b.h);

			var centerA = new Point(a.x + a.w / 2, a.y + a.h / 2);
			var centerB = new Point(b.x + b.w / 2, b.y + b.h / 2);
			var temp    = new Point(0, 0);

			if (centerA.x > centerB.x)
			{
				temp.x = a.x;
			}
			else
			{
				temp.x = a.x + a.w;
			}

			if (centerA.y > centerB.y)
			{
				temp.y = a.y;
			}
			else
			{
				temp.y = a.y + a.h;
			}

			centerA = temp;

			var distance = new Point(centerB.x - centerA.x, centerB.y - centerA.y);
			distance.normalize();

			if (Math.abs(distance.x) / (b.w / b.h) > Math.abs(distance.y))
			{
				//a is on right of b
				if (distance.x > 0)
				{
					//makes sure the player is going the right direction to latch
					if (this.accel.x > 0)
					{
						a.x          = b.x - a.w;
						this.accel.x = 0;
					}
				}
				//a is left right of b
				else
				{
					//makes sure the player is going the right direction to latch
					if (this.accel.x < 0)
					{
						a.x          = b.x + b.w;
						this.accel.x = 0;
					}
				}

			}
			else
			{
				//a is on top of b
				if (distance.y > 0)
				{
					//player has to 'fall' onto a block, cant be going up and latch to the top
					if (this.accel.y > 0)
					{
						this.grounded.push(b);
						this.onGrounded();
						this.accel.y = 0;
						a.y          = b.y - a.h;
					}
				}
				//a is below of b
				else
				{
					if (this.accel.y < 0)
					{
						this.rect.y -= this.rect.y;
						a.y          = b.y + b.h;
						this.accel.y = 0;
					}
				}

			}
		}
	}.bind(this));
};

Player.prototype.onGrounded = function()
{
	this.jumpState = 0;
};

Player.prototype.onJump = function()
{
};

Player.prototype.onPrepareJump = function()
{
};
