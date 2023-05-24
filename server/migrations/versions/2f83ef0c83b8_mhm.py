"""mhm

Revision ID: 2f83ef0c83b8
Revises: ca25ff98429c
Create Date: 2023-05-23 16:52:06.043161

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f83ef0c83b8'
down_revision = 'ca25ff98429c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('time', sa.Time(), nullable=True))
        batch_op.drop_column('date_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_time', sa.DATE(), nullable=True))
        batch_op.drop_column('time')
        batch_op.drop_column('date')

    # ### end Alembic commands ###