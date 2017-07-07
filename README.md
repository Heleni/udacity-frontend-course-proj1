### Version 1.0
# Overview
This package is an optional practice to the ["Full Stack Web Developer" nanodegree][FSWD] at [Udacity]. The main objective of this practice is to become familiarized with SQLAlchemy libary. There are three Python code files writen in Python 2.7.13. 
- The 'database_setup.py' creates and configurates a database 'puppyshelter.db' using SQLAlchemy library; 
- The 'puppypopulator.py' was created by [Udacity] instructing team. It poplulates the database.
- The 'puppy_query.py' uses SQLAlchemy library to:
1. Query all of the puppies and return the results in ascending alphabetical order
Example:
```
*****           All the puppies           *****
Abby        Angel       Annie       Bailey
Bailey      Bandit      Baxter      Bear
Beau        Bella       Belle       Bentley
```
2. Query all of the puppies that are less than 6 months old organized by the youngest first
Example:
```
*****All the puppy toddlers younger than 6 months*****
Romeo       2017-06-07
Penny       2017-06-04
Riley       2017-05-29
```
3. Query all puppies by ascending weight
Example:
```
*****From skiny to chubby*****
##### There is a warning line I do not know how to remove. Yet the code does its work alright.#####
/usr/local/lib/python2.7/dist-packages/sqlalchemy/sql/sqltypes.py:596: SAWarning: Dialect sqlite+pysqlite does *not* support Decimal objects natively, and SQLAlchemy must convert from floating point - rounding errors and other issues may occur. Please consider storing Decimal numbers as strings or integers on this platform for lossless storage.
  'storage.' % (dialect.name, dialect.driver)) 
Zoe         1.4 lbs
Sophie      1.6 lbs
Sandy       2.5 lbs
```
4. Query all puppies grouped by the shelter in which they are staying
Example:
```
1 Oakland Animal Services 16
2 San Francisco SPCA Mission Adoption Center 20
3 Wonder Dog Rescue 19
```
5. Query all puppies, organize them according to their shelter.
Example:
```
Oakland Animal Services   Charlie
Oakland Animal Services   Buddy
...
San Francisco SPCA Mission Adoption Center Harley
```

# How to use
The program is developed in a virtual machine of Ubuntu 16.04.2 environment. It has not been tested in other systems.
To use the program, you need to:
 - set up a command line terminal to run Python
 - install sqlalchemy 
 - run the database_setup.py in the command line
 - run puppypopulator.py in the command line
 - run puppy_query.py in the command line 
 *If the only some of the queries are needed, comment out the undesired functions

# License
MIT

***********************
  [FSWD]: <https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004>
  [Udacity]: <https://www.udacity.com>