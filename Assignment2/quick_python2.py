## Instructions

#Using the terminal, take an input of `r`, `p` or `s` which will stand for rock, paper, and scissors.

#Have the computer randomly pick one of these three choices.
#Compare the user's input to the computer's choice to determine if the user won, lost, or tied.

## Hints

#Make sure to `import random` is at the top of your code.

#Look into this [stackoverflow](https://stackoverflow.com/questions/306400/how-to-randomly-select-an-item-from-a-list) question for usage.

## Instructions

#Using a while loop, ask the user "How many numbers?", then print out a chain of ascending numbers, starting at 0.

#After the results have printed ask the user if they would like to continue.

#If "y", restart the process, starting at 0 again.

#If "n", exit the chain.

## Bonus

#Rather than just displaying numbers constantly starting at 0, have the numbers begin at the end of the previous chain.

while True:
    choice = int(input("How many numbers?"))
    for number in range(0, choice):
        print(number)
    answer = input("Would you like to continue? y/n")
    if answer == "n":
        break