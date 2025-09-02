---
title: "A watchOS app to help you cheat at Liars Dice using math"
date: "2025-08-31"
excerpt: "A watchOS app to help you cheat at Liars Dice using math"
tags: ["apple watch", "watchos", "swift", "gaming", "probability"]
slideshow: true
---

I like to play Liars Dice with friends and family, and since its getting easier and easier to scratch even minute software itches I thought: why not make a simple Apple Watch app to help me cheat?

And here we go: [a native Apple Watch app](https://github.com/neonwatty/liars-dice) that transforms gut instincts into more calculated decisions. 

Whats it do?  Liars dice is a game of probability and bluffing.  Everyone starts with a cup of dice.  Every round you all shake em up, and secretly look at your random scramble of die.  

Then the bidding begins: someone starts off with a call.  A `count` and a `face falue` they propose exists on the table, if everyone were to show their die.

The person to their right can call bullshit on that bid.  In which case everyone shows their die and the bid is determined true or false.  If the original bid is present (say the original bid was 'six fours') then the person who called bullshit loses a die.  Otherwise the original bidder loses a die.

Alternatively the next person can up the ante with their own bid: which needs to increase in either die value, die count, or both.

The game ends when only one person has die left.

This little Apple Watch app lets you discretely compute probabilities of the bid actually realizing - conditioned on the total number of die on the table, and the die in your own hand.  Makes decision making (bid or bullshit) a whole lot easier.

![Main screen showing dice input and probability calculation](/images/liars-dice-1.png)

![Bid configuration with count and face value selection](/images/liars-dice-2.png)

![Results showing probability percentage for informed decisions](/images/liars-dice-3.png)

Making apps to help you cheat your friends and family's getting easier with each passing day.